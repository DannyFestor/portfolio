import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens } from "../../integrations/design-tokens/design-tokens.ts";
import { screentoneSettings } from "../../integrations/screentone/screentone-settings.ts";
import { TONE_DENSITIES, toneClass } from "../../integrations/screentone/tone-density.ts";
import { svgDataUrl, toneTileSvg } from "../../integrations/screentone/tone-tile.ts";
import { findBuiltFiles, readBuiltFile } from "./built-site.ts";

const INLINE_STYLE = /<style\b[^>]*>(?<css>[\s\S]*?)<\/style>/gu;

const settings = screentoneSettings(readDesignTokens(process.cwd()));

function inlineStyles(page: string): string[] {
  return [...readBuiltFile(page).matchAll(INLINE_STYLE)].map(
    (match) => match.groups?.["css"] ?? "",
  );
}

/** Every stylesheet the site ships: bundled files and styles inlined into pages. */
const builtCss = [
  ...findBuiltFiles("**/*.css").map((file) => readBuiltFile(file)),
  ...findBuiltFiles("**/*.html").flatMap((page) => inlineStyles(page)),
].join("\n");

describe("screentone tiles in the built site", () => {
  it.each(TONE_DENSITIES)("include the %s tile, generated from the design tokens", (density) => {
    const tile = svgDataUrl(toneTileSvg(settings, density));
    expect(builtCss).toContain(`.${toneClass(density)}{--tone-tile:${tile}}`);
  });
});
