/**
 * The self-hosted fonts (#25): which faces ship, where they come from, and which characters each
 * subset keeps. This is the one list of the Japanese characters the site sets.
 *
 * `vp run fonts:subset` (scripts/subset-fonts.ts) rebuilds public/fonts from this file. New
 * Japanese copy needs its characters added here, in the family it is set in, and a rerun; the
 * build-contract tests fail on any character in the built pages that no shipped subset covers.
 */
import { APPROVED_SFX } from "../lettering/sfx.ts";

/** Google/fonts at the commit the source TTFs are taken from (2026-11-24). */
export const GOOGLE_FONTS_COMMIT = "83c62e30d87daa70216dab6b984d00d20d96d585";

/** The Latin characters every subset keeps, as pyftsubset `--unicodes` ranges. */
export const LATIN_UNICODE_RANGES: readonly string[] = [
  // Basic Latin
  "U+0020-007E",
  // Latin-1 Supplement: accented letters, no-break space, ©, ·, ×
  "U+00A0-00FF",
  // General punctuation: dashes, curly quotes, bullet, ellipsis
  "U+2010-2027",
  // General punctuation: per mille, primes, single guillemets
  "U+2030-203A",
  // Arrows: ← ↑ → ↓
  "U+2190-2193",
];

type FontWeight = 400 | 600 | 700;

export interface FontFaceSource {
  readonly weight: FontWeight;
  /** The source TTF, in the family's google/fonts directory. */
  readonly sourceFile: string;
}

export interface FontFamilySubset {
  /** The directory under /fonts that holds the family's subsets and its license. */
  readonly slug: string;
  /** The family's directory in google/fonts. */
  readonly googleFontsDirectory: string;
  /** The Japanese text the pages set in this family. Latin is kept anyway. */
  readonly japaneseText: readonly string[];
  readonly faces: readonly FontFaceSource[];
}

export const ZEN_ANTIQUE_REGULAR: FontFaceSource = {
  weight: 400,
  sourceFile: "ZenAntique-Regular.ttf",
};

/** Headings, display lettering and SFX. */
export const ZEN_ANTIQUE: FontFamilySubset = {
  slug: "zen-antique",
  googleFontsDirectory: "ofl/zenantique",
  japaneseText: [
    // SFX of the impact panels, from the SFX catalogue
    ...APPROVED_SFX,
    // Contact: the next-chapter preview strip
    "次回予告",
    // Blog listing: the table of contents title
    "目次",
    // Blog post: the episode number 第N話; the digit comes from the Latin subset
    "第話",
  ],
  faces: [ZEN_ANTIQUE_REGULAR],
};

/** Narration, body text and labels. */
export const SHIPPORI_MINCHO: FontFamilySubset = {
  slug: "shippori-mincho",
  googleFontsDirectory: "ofl/shipporimincho",
  japaneseText: [
    // About and Contact: the languages fact
    "日本語OK",
    // About and footer: the Japanese résumé link
    "職務経歴書",
  ],
  faces: [
    { weight: 400, sourceFile: "ShipporiMincho-Regular.ttf" },
    { weight: 600, sourceFile: "ShipporiMincho-SemiBold.ttf" },
    { weight: 700, sourceFile: "ShipporiMincho-Bold.ttf" },
  ],
};

/** Handwritten asides. */
const YOMOGI: FontFamilySubset = {
  slug: "yomogi",
  googleFontsDirectory: "ofl/yomogi",
  japaneseText: [
    // Home: the aside next to the contact panel
    "日本語OK",
  ],
  faces: [{ weight: 400, sourceFile: "Yomogi-Regular.ttf" }],
};

/** Code in blog posts (#16): Latin only. */
export const COURIER_PRIME: FontFamilySubset = {
  slug: "courier-prime",
  googleFontsDirectory: "ofl/courierprime",
  japaneseText: [],
  faces: [{ weight: 400, sourceFile: "CourierPrime-Regular.ttf" }],
};

export const FONT_FAMILIES: readonly FontFamilySubset[] = [
  ZEN_ANTIQUE,
  SHIPPORI_MINCHO,
  YOMOGI,
  COURIER_PRIME,
];

export function fontFileUrl(family: FontFamilySubset, face: FontFaceSource): string {
  return `/fonts/${family.slug}/${String(face.weight)}.woff2`;
}

/** The URL of every font file that ships. */
export function allFontFileUrls(): string[] {
  return FONT_FAMILIES.flatMap((family) => family.faces.map((face) => fontFileUrl(family, face)));
}

export function licenseFileUrl(family: FontFamilySubset): string {
  return `/fonts/${family.slug}/OFL.txt`;
}

/** The heading face is preloaded for LCP (#9). */
export const PRELOADED_FONT_URL = fontFileUrl(ZEN_ANTIQUE, ZEN_ANTIQUE_REGULAR);
