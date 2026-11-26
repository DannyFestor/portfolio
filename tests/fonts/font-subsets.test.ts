import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import {
  buildFontFilePath,
  buildLicenseFilePath,
  FONT_FAMILIES,
  fontFileUrl,
  licenseFileUrl,
} from "../../src/fonts/font-subsets.ts";
import { SHARE_IMAGE_LETTERING } from "../../src/share-image/share-image-content.ts";
import { ttfCodePoints } from "./ttf-code-points.ts";
import { woff2CodePoints } from "./woff2-code-points.ts";

const PUBLIC_DIRECTORY = "public";

/** Reads the code points a font file has a glyph for. */
type CodePointReader = (path: string) => ReadonlySet<number>;

const shippedFaces = FONT_FAMILIES.flatMap((family) =>
  family.faces.map((face) => ({
    file: fontFileUrl(family, face),
    japaneseText: family.japaneseText.join(""),
  })),
);

function charactersMissingFrom(
  path: string,
  text: string,
  codePointsOf: CodePointReader,
): string[] {
  const codePoints = codePointsOf(path);
  return [...new Set(text)].filter((character) => !codePoints.has(character.codePointAt(0) ?? 0));
}

function missingCharacters(file: string, text: string): string[] {
  return charactersMissingFrom(join(PUBLIC_DIRECTORY, file), text, woff2CodePoints);
}

const shareImageLines = Object.values(SHARE_IMAGE_LETTERING).map(({ text, face }) => ({
  text,
  file: buildFontFilePath(face),
}));

const shareImageFamilies = [
  ...new Set(Object.values(SHARE_IMAGE_LETTERING).map(({ face }) => face.family)),
];

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

describe("the share image's TTF copies (#20), against src/fonts/font-subsets.ts", () => {
  it.each(shareImageLines)("$file has every character of “$text”", ({ text, file }) => {
    expect(charactersMissingFrom(file, text, ttfCodePoints)).toStrictEqual([]);
  });

  it.each(shareImageFamilies.map((family) => buildLicenseFilePath(family)))(
    "%s sits next to the TTF copies",
    (license) => {
      expect(existsSync(license)).toBe(true);
    },
  );
});
