import { describe, expect, it } from "vite-plus/test";

import { screentoneStylesheet } from "./screentone-stylesheet.ts";
import { TEST_SETTINGS } from "./test-support/test-settings.ts";
import { TONE_DENSITIES } from "./tone-density.ts";
import { svgDataUrl, toneTileSvg } from "./tone-tile.ts";

const STYLESHEET = screentoneStylesheet(TEST_SETTINGS);

describe("screentone stylesheet", () => {
  it("sizes the tiles to one pitch times √2", () => {
    expect(STYLESHEET).toContain(":root { --tone-tile-size: 14.142px; }");
  });

  it.each(TONE_DENSITIES)("gives the %s tone a class that sets its tile", (density) => {
    const tile = svgDataUrl(toneTileSvg(TEST_SETTINGS, density));
    expect(STYLESHEET).toContain(`.tone-${density} { --tone-tile: ${tile}; }`);
  });
});
