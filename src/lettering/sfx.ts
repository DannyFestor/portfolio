/**
 * The SFX catalogue (#31): the Japanese sound effects Danny has proofread. An SFX is decorative
 * lettering in the page's one impact moment; anything outside this list is a type error.
 * src/fonts/font-subsets.ts sets these in the Zen Antique subset.
 */
export const APPROVED_SFX = [
  // Home: click
  "カチッ",
  // About: boom
  "ドン",
  // Contact: rumble
  "ゴゴゴ",
  // Case studies, the marketplace project: swoosh, sudden speed
  "シュッ",
] as const;

export type ApprovedSfx = (typeof APPROVED_SFX)[number];

/** At most this many SFX on one page: they belong to its one impact moment. */
export const MAX_SFX_PER_PAGE = 2;

/** The class every SFX carries in the built HTML; the build-contract tests find SFX by it. */
export const SFX_CLASS = "sfx";

const APPROVED_SFX_SET: ReadonlySet<string> = new Set(APPROVED_SFX);

export function isApprovedSfx(text: string): text is ApprovedSfx {
  return APPROVED_SFX_SET.has(text);
}
