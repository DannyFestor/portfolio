import { describe, expect, it } from "vite-plus/test";

import { parseDesignTokens, tokenNumber, tokenPixels, tokenValue } from "./design-tokens.ts";

const OPACITY = 0.85;
const PITCH_PIXELS = 6;

const TOKENS = parseDesignTokens(`
  :root {
    /* Comments around declarations are skipped. */
    --color-ink: #1b1a17;
    --tone-opacity: ${String(OPACITY)};
    --tone-pitch: ${String(PITCH_PIXELS)}px;
    --font-display: "Zen Antique", serif;
  }
`);

describe("design tokens", () => {
  it("reads a value as written", () => {
    expect(tokenValue(TOKENS, "--font-display")).toBe('"Zen Antique", serif');
  });

  it("reads a plain number", () => {
    expect(tokenNumber(TOKENS, "--tone-opacity")).toBe(OPACITY);
  });

  it("reads a length in px", () => {
    expect(tokenPixels(TOKENS, "--tone-pitch")).toBe(PITCH_PIXELS);
  });

  it("refuses a token the file does not declare", () => {
    expect(() => tokenValue(TOKENS, "--color-missing")).toThrow("declares no --color-missing");
  });

  it("refuses a number that is not plain", () => {
    expect(() => tokenNumber(TOKENS, "--tone-pitch")).toThrow("not a plain number");
  });

  it("refuses a length that is not in px", () => {
    expect(() => tokenPixels(TOKENS, "--color-ink")).toThrow("not a length in px");
  });
});
