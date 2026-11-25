import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens, tokenPixels } from "../../integrations/design-tokens/design-tokens.ts";

const tokens = readDesignTokens(process.cwd());

/** WCAG 2.2 success criterion 2.4.13 (focus appearance): an indicator at least 2px thick. */
const FOCUS_RING_MINIMUM_PIXELS = 2;

/** Underline weights at rest and on hover (#27): hover always makes the underline thicker. */
const UNDERLINE_WEIGHTS = [
  ["--link-underline-weight", "--link-underline-weight-hover"],
  ["--call-to-action-underline-weight", "--call-to-action-underline-weight-hover"],
] as const;

describe("link states (#27)", () => {
  it.each(UNDERLINE_WEIGHTS)("%s thickens to %s on hover", (rest, hover) => {
    expect(tokenPixels(tokens, hover)).toBeGreaterThan(tokenPixels(tokens, rest));
  });

  it(`draws the focus ring at least ${String(FOCUS_RING_MINIMUM_PIXELS)}px thick`, () => {
    expect(tokenPixels(tokens, "--focus-ring-width")).toBeGreaterThanOrEqual(
      FOCUS_RING_MINIMUM_PIXELS,
    );
  });
});
