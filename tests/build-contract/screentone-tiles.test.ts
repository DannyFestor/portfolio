import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens } from "../../integrations/design-tokens/design-tokens.ts";
import { screentoneSettings } from "../../integrations/screentone/screentone-settings.ts";
import { TONE_DENSITIES, toneClass } from "../../integrations/screentone/tone-density.ts";
import { svgDataUrl, toneTileSvg } from "../../integrations/screentone/tone-tile.ts";
import { builtStylesheets } from "./built-site.ts";

const settings = screentoneSettings(readDesignTokens(process.cwd()));
const builtCss = builtStylesheets();

describe("screentone tiles in the built site", () => {
  it.each(TONE_DENSITIES)("include the %s tile, generated from the design tokens", (density) => {
    const tile = svgDataUrl(toneTileSvg(settings, density));
    expect(builtCss).toContain(`.${toneClass(density)}{--tone-tile:${tile}}`);
  });
});
