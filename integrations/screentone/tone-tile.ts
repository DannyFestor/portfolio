import { formatCoordinate } from "../../src/geometry/format-coordinate.ts";
import type { Point } from "../../src/geometry/point.ts";
import type { ScreentoneSettings } from "./screentone-settings.ts";
import type { ToneDensity } from "./tone-density.ts";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

/** The centre dot sits halfway across the tile. */
const HALFWAY = 0.5;

/**
 * Side of the square tile that repeats into a 45° lattice of the given pitch. The tile carries a
 * dot at each corner and one at its centre, so its diagonal half is one pitch: no rotation is
 * needed.
 */
export function toneTileSide(pitch: number): number {
  return pitch * Math.SQRT2;
}

/** The dot centres of one tile: its four corners, clockwise from the top left, then its centre. */
export function toneTileDots(pitch: number): readonly Point[] {
  const side = toneTileSide(pitch);
  const centre = side * HALFWAY;
  return [
    { horizontal: 0, vertical: 0 },
    { horizontal: side, vertical: 0 },
    { horizontal: side, vertical: side },
    { horizontal: 0, vertical: side },
    { horizontal: centre, vertical: centre },
  ];
}

function circle(centre: Point, radius: number): string {
  const position = `cx='${formatCoordinate(centre.horizontal)}' cy='${formatCoordinate(centre.vertical)}'`;
  return `<circle ${position} r='${formatCoordinate(radius)}'/>`;
}

/** One tile of the given density as SVG markup, in CSS pixels. */
export function toneTileSvg(settings: ScreentoneSettings, density: ToneDensity): string {
  const side = formatCoordinate(toneTileSide(settings.pitch));
  const radius = settings.dotRadius[density];
  const dots = toneTileDots(settings.pitch).map((centre) => circle(centre, radius));
  const paint = `fill='${settings.color}' fill-opacity='${String(settings.opacity)}'`;
  return [
    `<svg xmlns='${SVG_NAMESPACE}' width='${side}' height='${side}' viewBox='0 0 ${side} ${side}'>`,
    `<g ${paint}>${dots.join("")}</g>`,
    "</svg>",
  ].join("");
}

/** A CSS `url()` that embeds the SVG as a percent-encoded data URL. */
export function svgDataUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
