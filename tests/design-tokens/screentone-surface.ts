import type { ScreentoneSettings } from "../../integrations/screentone/screentone-settings.ts";
import type { ToneDensity } from "../../integrations/screentone/tone-density.ts";
import { mixHexColors } from "./hex-color.ts";

/**
 * The share of a toned panel its dots cover. On the 45° lattice every dot owns a square cell one
 * pitch wide.
 */
export function toneDotCoverage(settings: ScreentoneSettings, density: ToneDensity): number {
  const radius = settings.dotRadius[density];
  return (Math.PI * radius * radius) / (settings.pitch * settings.pitch);
}

/**
 * A toned panel as the reader sees it: a halftone reads as the average of its dots and the paper
 * between them. Mixed in gamma-encoded sRGB, which comes out darker than mixing light would, so the
 * contrast measured against it errs low.
 */
export function toneSurfaceColor(
  paper: string,
  settings: ScreentoneSettings,
  density: ToneDensity,
): string {
  const share = toneDotCoverage(settings, density) * settings.opacity;
  return mixHexColors(settings.color, paper, share);
}
