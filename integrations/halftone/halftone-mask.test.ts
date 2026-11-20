import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

import { halftoneMask } from "./halftone-mask.ts";
import { expectStrictlyRising } from "./test-support/expect-strictly-rising.ts";

const SIZE = { width: 96, height: 24 };
const SCREEN = { name: "test", pitch: 4 };
const BAND_COUNT = 4;
const MAX_CHANNEL_VALUE = 255;

let workDirectory = "";
let gradientPath = "";

/** A horizontal ramp from white on the left to black on the right. */
async function writeGradient(path: string): Promise<void> {
  const { width, height } = SIZE;
  const pixels = Uint8Array.from({ length: width * height }, (_, index) =>
    Math.round(MAX_CHANNEL_VALUE * (1 - (index % width) / (width - 1))),
  );
  await sharp(pixels, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(path);
}

function renderGradientMask(): Promise<Buffer> {
  return halftoneMask(gradientPath, SIZE, SCREEN);
}

/** Mean alpha of each vertical band of the gradient's mask, from the left band to the right one. */
async function inkPerBand(): Promise<number[]> {
  const mask = sharp(await renderGradientMask()).raw();
  const { data, info } = await mask.toBuffer({ resolveWithObject: true });
  const bandWidth = info.width / BAND_COUNT;
  const totals = Array.from({ length: BAND_COUNT }, () => 0);
  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const band = Math.floor((pixel % info.width) / bandWidth);
    totals[band] = (totals[band] ?? 0) + (data[pixel * info.channels + info.channels - 1] ?? 0);
  }
  return totals.map((total) => total / (bandWidth * info.height));
}

beforeAll(async () => {
  workDirectory = mkdtempSync(join(tmpdir(), "halftone-"));
  gradientPath = join(workDirectory, "gradient.png");
  await writeGradient(gradientPath);
});

afterAll(() => {
  rmSync(workDirectory, { recursive: true, force: true });
});

describe("screening a gradient photo", () => {
  it("renders a PNG of the requested size with an alpha channel", async () => {
    const metadata = await sharp(await renderGradientMask()).metadata();
    expect(metadata).toMatchObject({ format: "png", ...SIZE, hasAlpha: true });
  });

  it("inks more of the page where the photo is darker", async () => {
    expectStrictlyRising(await inkPerBand());
  });

  it("renders the same bytes every time", async () => {
    const [first, second] = await Promise.all([renderGradientMask(), renderGradientMask()]);
    expect(first).toStrictEqual(second);
  });
});
