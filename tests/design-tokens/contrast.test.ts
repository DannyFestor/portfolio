import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens, tokenValue } from "../../integrations/design-tokens/design-tokens.ts";
import { contrastRatio } from "./wcag-contrast.ts";

const tokens = readDesignTokens(process.cwd());

/** WCAG 2.2 AA, success criterion 1.4.3. */
const BODY_TEXT_MINIMUM = 4.5;

/** Large text: at least 24px regular or 18.66px bold. */
const LARGE_TEXT_MINIMUM = 3;

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
    usage: "red display lettering and SFX only",
    minimum: LARGE_TEXT_MINIMUM,
  },
];

describe("design-token text contrast (WCAG 2.2 AA)", () => {
  it.each(TEXT_PAIRS)(
    "$text on $background ($usage) reaches $minimum:1",
    ({ text, background, minimum }) => {
      const ratio = contrastRatio(tokenValue(tokens, text), tokenValue(tokens, background));
      expect(ratio).toBeGreaterThanOrEqual(minimum);
    },
  );
});
