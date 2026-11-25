import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { FONT_FAMILIES, fontFileUrl, licenseFileUrl } from "../../src/fonts/font-subsets.ts";
import { woff2CodePoints } from "./woff2-code-points.ts";

const PUBLIC_DIRECTORY = "public";

const shippedFaces = FONT_FAMILIES.flatMap((family) =>
  family.faces.map((face) => ({
    file: fontFileUrl(family, face),
    japaneseText: family.japaneseText.join(""),
  })),
);

function missingCharacters(file: string, text: string): string[] {
  const codePoints = woff2CodePoints(join(PUBLIC_DIRECTORY, file));
  return [...new Set(text)].filter((character) => !codePoints.has(character.codePointAt(0) ?? 0));
}

describe("shipped font subsets, against src/fonts/font-subsets.ts (rerun `vp run fonts:subset`)", () => {
  it.each(shippedFaces)(
    "$file keeps the Japanese text its family sets",
    ({ file, japaneseText }) => {
      expect(missingCharacters(file, japaneseText)).toStrictEqual([]);
    },
  );

  it.each(FONT_FAMILIES.map((family) => licenseFileUrl(family)))(
    "%s ships the family's license",
    (license) => {
      expect(existsSync(join(PUBLIC_DIRECTORY, license))).toBe(true);
    },
  );
});
