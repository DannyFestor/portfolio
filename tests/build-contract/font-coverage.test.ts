import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { allFontFileUrls, COURIER_PRIME, fontFileUrl } from "../../src/fonts/font-subsets.ts";
import { woff2CodePoints } from "../fonts/woff2-code-points.ts";
import {
  BUILT_SITE_DIRECTORY,
  builtStylesheets,
  findBuiltFiles,
  readBuiltFile,
} from "./built-site.ts";
import { decodeNumericCharacterReferences } from "./character-references.ts";

const LAST_ASCII_CODE_POINT = 0x7f;
/** The space; below it are tabs and line breaks, which no font draws. */
const FIRST_PRINTABLE_CODE_POINT = 0x20;
const HEXADECIMAL = 16;
const CODE_POINT_DIGITS = 4;
const FONT_URL = /url\(\s*["']?(?<url>[^"')\s]+\.woff2)/gu;
/** Emoji are drawn by the reader's colour emoji font; no text font subset carries them. */
const EMOJI = /^\p{Extended_Pictographic}$/u;
const CODE = /<code\b[^>]*>(?<code>[\s\S]*?)<\/code>/gu;
const TAG = /<[^>]+>/gu;

const shippedFontFiles = findBuiltFiles("fonts/**/*.woff2");

/** Every code point at least one shipped subset has a glyph for. */
const coveredCodePoints = new Set(
  shippedFontFiles.flatMap((file) => [...woff2CodePoints(join(BUILT_SITE_DIRECTORY, file))]),
);

function describeCodePoint(codePoint: number): string {
  const hex = codePoint.toString(HEXADECIMAL).toUpperCase().padStart(CODE_POINT_DIGITS, "0");
  return `U+${hex} ${String.fromCodePoint(codePoint)}`;
}

/** Every code point the code face, Courier Prime, has a glyph for. */
const codeFaceCodePoints = new Set(
  COURIER_PRIME.faces.flatMap((face) =>
    Array.from(woff2CodePoints(join(BUILT_SITE_DIRECTORY, fontFileUrl(COURIER_PRIME, face)))),
  ),
);

function codePointsOf(text: string): Set<number> {
  return new Set(Array.from(text, (character) => character.codePointAt(0) ?? 0));
}

function uncoveredCharacters(page: string): string[] {
  const text = decodeNumericCharacterReferences(readBuiltFile(page));
  return [...codePointsOf(text)]
    .filter((codePoint) => codePoint > LAST_ASCII_CODE_POINT && !coveredCodePoints.has(codePoint))
    .filter((codePoint) => !EMOJI.test(String.fromCodePoint(codePoint)))
    .map((codePoint) => describeCodePoint(codePoint));
}

/** The text of the page's code: code blocks and inline code, tags dropped. */
function codeText(page: string): string {
  const code = [...readBuiltFile(page).matchAll(CODE)].map((match) => match.groups?.["code"] ?? "");
  return decodeNumericCharacterReferences(code.join("\n").replaceAll(TAG, ""));
}

function charactersMissingFromCodeFace(page: string): string[] {
  return [...codePointsOf(codeText(page))]
    .filter((codePoint) => codePoint >= FIRST_PRINTABLE_CODE_POINT)
    .filter((codePoint) => !codeFaceCodePoints.has(codePoint))
    .map((codePoint) => describeCodePoint(codePoint));
}

const pagesWithCode = findBuiltFiles("**/*.html").filter((page) => codeText(page) !== "");

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

describe("code in the built pages (#16)", () => {
  it("is on some page", () => {
    expect(pagesWithCode.length).toBeGreaterThan(0);
  });

  it.each(pagesWithCode)("every character of the code in %s is in Courier Prime", (page) => {
    expect(charactersMissingFromCodeFace(page)).toStrictEqual([]);
  });
});
