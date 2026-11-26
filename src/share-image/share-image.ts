/**
 * Renders the share image (#20) at build time: the halftone photo and the lettering, laid out by
 * Satori into SVG and drawn into a PNG by sharp. No hand-made file and no client script.
 */
import satori from "satori";
import sharp from "sharp";
import type { PngOptions } from "sharp";

import { SHARE_IMAGE_SIZE } from "./share-image-file.ts";
import { shareImageFonts } from "./share-image-fonts.ts";
import { sharePanels } from "./share-image-layout.ts";
import { sharePhotoUrl } from "./share-image-photo.ts";
import { shareImageStyle } from "./share-image-style.ts";
import { shareImageTree } from "./share-image-tree.ts";

/**
 * The image is ink on paper and the anti-aliased edges between them: 16 shades keep it unchanged to
 * the eye at a third of the file size. Dithering would only speckle the paper.
 */
const PNG_OUTPUT = {
  palette: true,
  colours: 16,
  dither: 0,
  compressionLevel: 9,
  effort: 10,
} as const satisfies PngOptions;

/** The share image as PNG bytes, drawn from the files under `rootDirectory`. */
export async function renderShareImage(rootDirectory: string): Promise<Buffer> {
  const style = shareImageStyle(rootDirectory);
  const panels = sharePanels(SHARE_IMAGE_SIZE, { margin: style.pageMargin, gutter: style.gutter });
  const photoUrl = await sharePhotoUrl(rootDirectory, panels, style);
  const svg = await satori(shareImageTree({ panels, style, photoUrl }), {
    ...SHARE_IMAGE_SIZE,
    fonts: await shareImageFonts(rootDirectory),
  });
  return sharp(Buffer.from(svg)).png(PNG_OUTPUT).toBuffer();
}
