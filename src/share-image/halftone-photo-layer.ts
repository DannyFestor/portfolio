import sharp from "sharp";

import { halftoneMask } from "../../integrations/halftone/halftone-mask.ts";
import type { HalftoneScreen, RasterSize } from "../../integrations/halftone/halftone-screen.ts";
import { cropToFrame } from "./photo-crop.ts";
import type { VerticalSpan } from "./photo-crop.ts";

const INK_CHANNELS = 3;

/** A photo and the band of it that must stay in any crop. */
export interface FramedPhoto {
  readonly path: string;
  readonly subject: VerticalSpan;
}

/** How the photo is printed: through which screen, at which mask size, in which ink. */
export interface PhotoInk {
  readonly screen: HalftoneScreen;
  readonly maskSize: RasterSize;
  /** A CSS hex color. */
  readonly color: string;
}

/**
 * The photo plate's mask, cropped to the frame's aspect ratio and scaled down to it, as the plate's
 * CSS mask is: the same dots, at the same count across the photo. Its alpha is the ink.
 */
async function framedInk(photo: FramedPhoto, frame: RasterSize, ink: PhotoInk): Promise<Buffer> {
  const mask = await halftoneMask(photo.path, ink.maskSize, ink.screen);
  return sharp(mask)
    .extract(cropToFrame(ink.maskSize, frame, photo.subject))
    .resize(frame.width, frame.height)
    .extractChannel("alpha")
    .raw()
    .toBuffer();
}

/**
 * The photo in halftone, filling `frame`: a PNG of the ink color whose alpha is the ink, so the
 * panel's paper shows between the dots, as on the photo plate.
 */
export async function halftonePhotoLayer(
  photo: FramedPhoto,
  frame: RasterSize,
  ink: PhotoInk,
): Promise<Buffer> {
  const alpha = await framedInk(photo, frame, ink);
  const { width, height } = frame;
  return sharp({ create: { width, height, channels: INK_CHANNELS, background: ink.color } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}
