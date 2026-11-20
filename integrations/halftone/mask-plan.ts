import { globSync } from "node:fs";
import { basename, extname, join } from "node:path";

import type { HalftoneScreen, RasterSize } from "./halftone-screen.ts";

/** Every photo in this folder is screened into one mask per screen. */
const PHOTO_DIRECTORY = "src/assets/photos";
const PHOTO_PATTERN = "*.{jpg,jpeg,png,webp}";

/** Generated and gitignored; pages import the masks from here, so they go through Astro's images. */
export const MASK_DIRECTORY = "src/assets/halftone";

export const MASK_SIZE: RasterSize = { width: 960, height: 1280 };

const HALFTONE_SCREENS: readonly HalftoneScreen[] = [
  { name: "coarse", pitch: 8 },
  { name: "fine", pitch: 5 },
];

/** One mask to render: `photoPath` screened through `screen`, written to `maskPath`. */
export interface PlannedMask {
  readonly photoPath: string;
  readonly maskPath: string;
  readonly screen: HalftoneScreen;
}

function maskFileName(photoFileName: string, screen: HalftoneScreen): string {
  return `${basename(photoFileName, extname(photoFileName))}-${screen.name}.png`;
}

/** The masks for every photo and screen, in a stable order, with paths under `rootDirectory`. */
export function planHalftoneMasks(rootDirectory: string): PlannedMask[] {
  const photoDirectory = join(rootDirectory, PHOTO_DIRECTORY);
  const photoFileNames = globSync(PHOTO_PATTERN, { cwd: photoDirectory }).toSorted();
  return photoFileNames.flatMap((photoFileName) =>
    HALFTONE_SCREENS.map((screen) => ({
      photoPath: join(photoDirectory, photoFileName),
      maskPath: join(rootDirectory, MASK_DIRECTORY, maskFileName(photoFileName, screen)),
      screen,
    })),
  );
}
