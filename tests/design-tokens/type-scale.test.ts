import { describe, expect, it } from "vite-plus/test";

import {
  readDesignTokens,
  tokenNumber,
  tokenPixels,
} from "../../integrations/design-tokens/design-tokens.ts";
import { SHIPPORI_MINCHO } from "../../src/fonts/font-subsets.ts";

const tokens = readDesignTokens(process.cwd());

/** Decided in #25: a quiet scale, each heading level 1.2 times the one below, from the narration. */
const SCALE_RATIO = 1.2;
const HEADINGS_FROM_SMALLEST = [
  "--font-size-h4",
  "--font-size-h3",
  "--font-size-h2",
  "--font-size-h1",
];
const HEADING_STEPS = HEADINGS_FROM_SMALLEST.map((name, index) => [name, index + 1] as const);

/** Yomogi turns illegible below this size. */
const ASIDE_FLOOR_PIXELS = 15;

const MINCHO_WEIGHT_TOKENS = ["--font-weight-text", "--font-weight-label", "--font-weight-bold"];

describe("type scale (#25)", () => {
  it.each(HEADING_STEPS)("%s is the narration size × 1.2^%i, in whole pixels", (name, step) => {
    const narration = tokenPixels(tokens, "--font-size-narration");
    expect(tokenPixels(tokens, name)).toBe(Math.round(narration * SCALE_RATIO ** step));
  });

  it(`sets asides no smaller than ${String(ASIDE_FLOOR_PIXELS)}px`, () => {
    expect(tokenPixels(tokens, "--font-size-aside")).toBeGreaterThanOrEqual(ASIDE_FLOOR_PIXELS);
  });

  it.each(MINCHO_WEIGHT_TOKENS)("%s has a shipped Shippori Mincho face", (name) => {
    const shippedWeights = SHIPPORI_MINCHO.faces.map((face) => face.weight as number);
    expect(shippedWeights).toContain(tokenNumber(tokens, name));
  });
});
