import { formatCoordinate } from "../../src/geometry/format-coordinate.ts";
import type { ScreentoneSettings } from "./screentone-settings.ts";
import { TONE_DENSITIES, toneClass } from "./tone-density.ts";
import type { ToneDensity } from "./tone-density.ts";
import { svgDataUrl, toneTileSide, toneTileSvg } from "./tone-tile.ts";

function tileSizeRule(settings: ScreentoneSettings): string {
  return `:root { --tone-tile-size: ${formatCoordinate(toneTileSide(settings.pitch))}px; }`;
}

function densityRule(settings: ScreentoneSettings, density: ToneDensity): string {
  return `.${toneClass(density)} { --tone-tile: ${svgDataUrl(toneTileSvg(settings, density))}; }`;
}

/**
 * The tone tiles as CSS: `--tone-tile-size` on the root and one `.tone-<density>` class per density
 * that sets `--tone-tile`. src/styles/screentone.css paints them.
 */
export function screentoneStylesheet(settings: ScreentoneSettings): string {
  const densityRules = TONE_DENSITIES.map((density) => densityRule(settings, density));
  return [tileSizeRule(settings), ...densityRules].join("\n");
}
