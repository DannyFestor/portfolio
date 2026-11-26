import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Font } from "satori";

import { buildFontFilePath, SHARE_IMAGE_FACES } from "../fonts/font-subsets.ts";
import type { FamilyFace } from "../fonts/font-subsets.ts";

/** Satori knows each face by its family's slug, which the lettering names as its font family. */
async function fontOf(rootDirectory: string, familyFace: FamilyFace): Promise<Font> {
  return {
    name: familyFace.family.slug,
    data: await readFile(join(rootDirectory, buildFontFilePath(familyFace))),
    weight: familyFace.face.weight,
    style: "normal",
  };
}

/** The TTF copies of the faces the share image is lettered in, read from under `rootDirectory`. */
export function shareImageFonts(rootDirectory: string): Promise<Font[]> {
  return Promise.all(Object.values(SHARE_IMAGE_FACES).map((face) => fontOf(rootDirectory, face)));
}
