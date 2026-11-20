/** Lifts the midtones, so the screen prints lighter than a linear response, as screentone does. */
const DARKNESS_GAMMA = 1.45;

/**
 * Radius of a fully dark dot, as a share of the pitch. Above √½ ≈ 0.707 neighbouring dots touch, so
 * the darkest areas close up into solid ink.
 */
const FULL_DOT_RADIUS_PER_PITCH = 0.72;

/** Width, in pixels, of the ramp from paper to ink at a dot's edge. */
const ANTI_ALIAS_EDGE_PX = 1;

/** A pixel whose centre sits exactly on the dot's edge is half covered. */
const COVERAGE_ON_EDGE = 0.5;

function clampToUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Darkness (0 = paper, 1 = ink) of a luminance between 0 (black) and 1 (white). */
export function darknessOf(luminance: number): number {
  return (1 - clampToUnit(luminance)) ** DARKNESS_GAMMA;
}

/** Amplitude modulation: the dot's area, not its radius, grows in step with darkness. */
export function dotRadius(darkness: number, pitch: number): number {
  return pitch * FULL_DOT_RADIUS_PER_PITCH * Math.sqrt(clampToUnit(darkness));
}

/**
 * Share of a pixel covered by ink, from its distance to the dot's centre. A dot can never put more
 * ink on a pixel than its own area, so a vanishing dot leaves the paper bare.
 */
export function inkCoverage(radius: number, distanceFromCentre: number): number {
  const edgeRamp = (radius - distanceFromCentre) / ANTI_ALIAS_EDGE_PX + COVERAGE_ON_EDGE;
  const dotArea = Math.PI * radius * radius;
  return clampToUnit(Math.min(edgeRamp, dotArea));
}
