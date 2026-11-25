import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens, tokenValue } from "../../integrations/design-tokens/design-tokens.ts";
import { contrastRatio } from "./wcag-contrast.ts";

const tokens = readDesignTokens(process.cwd());

/** WCAG 2.2 AA, success criterion 1.4.3. */
const BODY_TEXT_MINIMUM = 4.5;

/** WCAG 2.2 AA, success criterion 1.4.11: focus indicators and other non-text UI. */
const NON_TEXT_MINIMUM = 3;

interface TextPair {
  readonly text: string;
  readonly background: string;
  readonly usage: string;
  readonly minimum: number;
}

/** Every text/background pair the manga concept (#7) uses. Text never sits on raw screentone. */
const TEXT_PAIRS: readonly TextPair[] = [
  {
    text: "--color-ink",
    background: "--color-paper",
    usage: "narration and body text",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-ink",
    background: "--color-page-background",
    usage: "masthead outside the paper page",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-paper",
    background: "--color-ink",
    usage: "period tags and the current-page tab",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-tone",
    background: "--color-paper",
    usage: "indigo numerals and code tokens",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-accent",
    background: "--color-paper",
    usage: "SFX, impact lines, status marks and asides",
    minimum: BODY_TEXT_MINIMUM,
  },
];

/** The focus ring must stand out against every surface a focusable element sits on. */
const FOCUS_RING_SURFACES: readonly string[] = ["--color-paper", "--color-page-background"];

describe("design-token text contrast (WCAG 2.2 AA)", () => {
  it.each(TEXT_PAIRS)(
    "$text on $background ($usage) reaches $minimum:1",
    ({ text, background, minimum }) => {
      const ratio = contrastRatio(tokenValue(tokens, text), tokenValue(tokens, background));
      expect(ratio).toBeGreaterThanOrEqual(minimum);
    },
  );
});

describe("focus ring contrast (WCAG 2.2 AA)", () => {
  it("draws the focus ring in ink", () => {
    expect(tokenValue("--focus-ring-color")).toBe("var(--color-ink)");
  });

  it.each(FOCUS_RING_SURFACES)("--color-ink focus ring on %s reaches 3:1", (surface) => {
    const ratio = contrastRatio(tokenValue("--color-ink"), tokenValue(surface));
    expect(ratio).toBeGreaterThanOrEqual(NON_TEXT_MINIMUM);
  });
});
