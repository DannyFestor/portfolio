import sharp from "sharp";

import type { Point } from "../../src/geometry/point.ts";
import { screenRaster } from "./halftone-screen.ts";
import type { GrayRaster, HalftoneScreen, RasterSize } from "./halftone-screen.ts";

/** Tone curve after normalising: a touch more contrast, with the shadows lifted a little. */
const TONE_CONTRAST = 1.05;
const TONE_SHADOW_LIFT = 8;

const MAX_CHANNEL_VALUE = 255;
const PNG_COMPRESSION_LEVEL = 9;

function clampToPixelIndex(coordinate: number, length: number): number {
  return Math.min(length - 1, Math.max(0, Math.floor(coordinate)));
}

/** Resizes the photo to `size` and tones it into a normalised grayscale raster. */
async function readTonedRaster(photoPath: string, size: RasterSize): Promise<GrayRaster> {
  const pixels = await sharp(photoPath)
    .resize(size.width, size.height)
    .grayscale()
    .normalise()
    .linear(TONE_CONTRAST, TONE_SHADOW_LIFT)
    .raw()
    .toBuffer();
  const indexOf = (point: Point): number =>
    clampToPixelIndex(point.vertical, size.height) * size.width +
    clampToPixelIndex(point.horizontal, size.width);
  return { size, luminanceAt: (point) => (pixels[indexOf(point)] ?? 0) / MAX_CHANNEL_VALUE };
}

function toAlphaChannel(raster: GrayRaster, screen: HalftoneScreen): Buffer {
  const coverage = screenRaster(raster, screen);
  return Buffer.from(coverage.map((share) => Math.round(share * MAX_CHANNEL_VALUE)));
}

/** Encodes coverage as a grey-and-alpha PNG: every pixel is black, and its alpha is the ink. */
function encodeAlphaMask(raster: GrayRaster, screen: HalftoneScreen): Promise<Buffer> {
  const { width, height } = raster.size;
  const singleChannel = { raw: { width, height, channels: 1 } } as const;
  const black = Buffer.alloc(width * height);
  return sharp(black, singleChannel)
    .joinChannel(toAlphaChannel(raster, screen), singleChannel)
    .png({ compressionLevel: PNG_COMPRESSION_LEVEL })
    .toBuffer();
}

/** Screens the photo into a PNG mask of `size` whose alpha channel is the ink. */
export async function halftoneMask(
  photoPath: string,
  size: RasterSize,
  screen: HalftoneScreen,
): Promise<Buffer> {
  return encodeAlphaMask(await readTonedRaster(photoPath, size), screen);
}
