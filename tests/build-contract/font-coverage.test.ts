import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { allFontFileUrls } from "../../src/fonts/font-subsets.ts";
import { woff2CodePoints } from "../fonts/woff2-code-points.ts";
import {
  BUILT_SITE_DIRECTORY,
  builtStylesheets,
  findBuiltFiles,
  readBuiltFile,
} from "./built-site.ts";

const LAST_ASCII_CODE_POINT = 0x7f;
const HEXADECIMAL = 16;
const CODE_POINT_DIGITS = 4;
const NUMERIC_CHARACTER_REFERENCE = /&#(?:x[\da-f]+|\d+);/giu;
const HEXADECIMAL_REFERENCE = /^&#x/iu;
const REFERENCE_PREFIX = "&#";
const REFERENCE_SUFFIX = ";";
const FONT_URL = /url\(\s*["']?(?<url>[^"')\s]+\.woff2)/gu;

const shippedFontFiles = findBuiltFiles("fonts/**/*.woff2");

/** Every code point at least one shipped subset has a glyph for. */
const coveredCodePoints = new Set(
  shippedFontFiles.flatMap((file) => [...woff2CodePoints(join(BUILT_SITE_DIRECTORY, file))]),
);

/** `&#x732B;` or `&#29483;` to the character it stands for. */
function decodeNumericCharacterReference(reference: string): string {
  const digits = reference.slice(REFERENCE_PREFIX.length, -REFERENCE_SUFFIX.length);
  return String.fromCodePoint(
    HEXADECIMAL_REFERENCE.test(reference)
      ? Number.parseInt(digits.slice(1), HEXADECIMAL)
      : Number(digits),
  );
}

function decodeNumericCharacterReferences(html: string): string {
  return html.replaceAll(NUMERIC_CHARACTER_REFERENCE, (reference) =>
    decodeNumericCharacterReference(reference),
  );
}

function describeCodePoint(codePoint: number): string {
  const hex = codePoint.toString(HEXADECIMAL).toUpperCase().padStart(CODE_POINT_DIGITS, "0");
  return `U+${hex} ${String.fromCodePoint(codePoint)}`;
}

function uncoveredCharacters(page: string): string[] {
  const text = decodeNumericCharacterReferences(readBuiltFile(page));
  const codePoints = new Set(Array.from(text, (character) => character.codePointAt(0) ?? 0));
  return [...codePoints]
    .filter((codePoint) => codePoint > LAST_ASCII_CODE_POINT && !coveredCodePoints.has(codePoint))
    .map((codePoint) => describeCodePoint(codePoint));
}

function fontFaceUrls(css: string): string[] {
  return [...new Set([...css.matchAll(FONT_URL)].map((match) => match.groups?.["url"] ?? ""))];
}

describe("self-hosted fonts in the built site", () => {
  it("ship every subset in src/fonts/font-subsets.ts", () => {
    expect(shippedFontFiles.map((file) => `/${file}`)).toStrictEqual(allFontFileUrls().toSorted());
  });

  it("are loaded by @font-face rules for exactly the shipped subsets", () => {
    expect(fontFaceUrls(builtStylesheets()).toSorted()).toStrictEqual(allFontFileUrls().toSorted());
  });
});

describe("characters in the built pages (add new ones to src/fonts/font-subsets.ts)", () => {
  it.each(findBuiltFiles("**/*.html"))("every character in %s is in a shipped subset", (page) => {
    expect(uncoveredCharacters(page)).toStrictEqual([]);
  });
});
