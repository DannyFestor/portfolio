/**
 * Screentone densities, lightest first. They differ by dot radius only (tokens.css,
 * `--tone-dot-*`).
 */
export const TONE_DENSITIES = ["light", "mid", "dense", "deep"] as const;

export type ToneDensity = (typeof TONE_DENSITIES)[number];

/** The class that sets the tone tile of this density; the screentone integration generates it. */
export function toneClass(density: ToneDensity): string {
  return `tone-${density}`;
}
