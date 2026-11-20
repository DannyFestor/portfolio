import { tokenNumber, tokenPixels, tokenValue } from "../design-tokens/design-tokens.ts";
import type { DesignTokens } from "../design-tokens/design-tokens.ts";
import type { ToneDensity } from "./tone-density.ts";

/** Everything a tone tile is drawn from, read from the design tokens. */
export interface ScreentoneSettings {
  /** Dot colour, a hex colour. */
  readonly color: string;
  readonly opacity: number;
  /** Distance in CSS pixels between neighbouring dots, along the 45° screen. */
  readonly pitch: number;
  /** Dot radius in CSS pixels, per density. */
  readonly dotRadius: Readonly<Record<ToneDensity, number>>;
}

function dotRadius(tokens: DesignTokens, density: ToneDensity): number {
  return tokenPixels(tokens, `--tone-dot-${density}`);
}

export function screentoneSettings(tokens: DesignTokens): ScreentoneSettings {
  return {
    color: tokenValue(tokens, "--color-tone"),
    opacity: tokenNumber(tokens, "--tone-opacity"),
    pitch: tokenPixels(tokens, "--tone-pitch"),
    dotRadius: {
      light: dotRadius(tokens, "light"),
      mid: dotRadius(tokens, "mid"),
      dense: dotRadius(tokens, "dense"),
      deep: dotRadius(tokens, "deep"),
    },
  };
}
