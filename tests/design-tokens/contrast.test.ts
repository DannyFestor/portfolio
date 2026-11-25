import { describe, expect, it } from "vite-plus/test";

import {
  readDesignTokens,
  resolvedTokenValue,
} from "../../integrations/design-tokens/design-tokens.ts";
import { screentoneSettings } from "../../integrations/screentone/screentone-settings.ts";
import { TONE_DENSITIES } from "../../integrations/screentone/tone-density.ts";
import { toneSurfaceColor } from "./screentone-surface.ts";
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
    text: "--color-paper",
    background: "--color-accent",
    usage: "the current engagement's period tag",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-tone",
    background: "--color-paper",
    usage: "indigo numerals and code tokens",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-grey",
    background: "--color-paper",
    usage: "comments in code blocks",
    minimum: BODY_TEXT_MINIMUM,
  },
  {
    text: "--color-accent",
    background: "--color-paper",
    usage: "SFX, impact lines, status marks and asides",
    minimum: BODY_TEXT_MINIMUM,
  },
];

interface NonTextPair {
  readonly mark: string;
  readonly surface: string;
  readonly usage: string;
}

/** Marks that carry meaning without being text: they must stand out from the surface they sit on. */
const NON_TEXT_PAIRS: readonly NonTextPair[] = [
  { mark: "--focus-ring-color", surface: "--color-paper", usage: "keyboard focus" },
  { mark: "--focus-ring-color", surface: "--color-page-background", usage: "keyboard focus" },
  { mark: "--link-underline-color", surface: "--color-paper", usage: "link underline" },
  {
    mark: "--link-underline-color-hover",
    surface: "--color-paper",
    usage: "hovered link underline",
  },
  {
    mark: "--link-underline-color-visited",
    surface: "--color-paper",
    usage: "visited link underline",
  },
];

function tokenContrast(first: string, second: string): number {
  return contrastRatio(resolvedTokenValue(tokens, first), resolvedTokenValue(tokens, second));
}

describe("design-token text contrast (WCAG 2.2 AA)", () => {
  it.each(TEXT_PAIRS)(
    "$text on $background ($usage) reaches $minimum:1",
    ({ text, background, minimum }) => {
      expect(tokenContrast(text, background)).toBeGreaterThanOrEqual(minimum);
    },
  );
});

describe("design-token non-text contrast (WCAG 2.2 AA)", () => {
  it.each(NON_TEXT_PAIRS)(
    `$mark on $surface ($usage) reaches ${String(NON_TEXT_MINIMUM)}:1`,
    ({ mark, surface }) => {
      expect(tokenContrast(mark, surface)).toBeGreaterThanOrEqual(NON_TEXT_MINIMUM);
    },
  );
});

/**
 * A toned panel reads as the average of its dots and the paper (#27, decided 2026-11-25). Over a
 * single dot the ink ring is darker than 3:1 would need, but the dots cover a small share of the
 * panel; the ring is measured against the tone as the reader sees it.
 */
describe("focus ring on toned panels (WCAG 2.2 AA)", () => {
  const settings = screentoneSettings(tokens);
  const paper = resolvedTokenValue(tokens, "--color-paper");

  it.each(TONE_DENSITIES)(
    `--focus-ring-color on %s tone reaches ${String(NON_TEXT_MINIMUM)}:1`,
    (density) => {
      const surface = toneSurfaceColor(paper, settings, density);
      const ring = resolvedTokenValue(tokens, "--focus-ring-color");
      expect(contrastRatio(ring, surface)).toBeGreaterThanOrEqual(NON_TEXT_MINIMUM);
    },
  );
});
