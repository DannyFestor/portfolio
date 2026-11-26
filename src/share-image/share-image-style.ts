/**
 * The design tokens the share image is drawn with, read from src/styles/tokens.css, so the image
 * keeps the site's paper, ink, line weights and spacing.
 */
import {
  readDesignTokens,
  resolvedTokenValue,
  tokenPixels,
} from "../../integrations/design-tokens/design-tokens.ts";

export interface ShareImageStyle {
  readonly paper: string;
  readonly ink: string;
  readonly panelLine: number;
  readonly narrationLine: number;
  /** Around the panels, as on a composed manga page. */
  readonly pageMargin: number;
  readonly gutter: number;
  /** Inside the lettering panel. */
  readonly panelPadding: number;
  /** Inside the narration box. */
  readonly narrationPadding: { readonly block: number; readonly inline: number };
  /** Between the name and the positioning line's beats. */
  readonly letteringGap: number;
}

export function shareImageStyle(rootDirectory: string): ShareImageStyle {
  const tokens = readDesignTokens(rootDirectory);
  const pixels = (name: string): number => tokenPixels(tokens, name);
  return {
    paper: resolvedTokenValue(tokens, "--color-paper"),
    ink: resolvedTokenValue(tokens, "--color-ink"),
    panelLine: pixels("--line-panel"),
    narrationLine: pixels("--line-narration"),
    pageMargin: pixels("--space-2xl"),
    gutter: pixels("--gutter"),
    panelPadding: pixels("--space-3xl"),
    narrationPadding: { block: pixels("--space-s"), inline: pixels("--space-m") },
    letteringGap: pixels("--space-l"),
  };
}
