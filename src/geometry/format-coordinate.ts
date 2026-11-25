import type { Point } from "./point.ts";

/** Decimal places kept when a coordinate is written into SVG or CSS: far below a device pixel. */
const DECIMAL_PLACES = 3;
const DECIMAL_BASE = 10;
const SCALE = DECIMAL_BASE ** DECIMAL_PLACES;

/** A coordinate as short markup: `8.485` for 8.48528…, `9` for 9.000. */
export function formatCoordinate(value: number): string {
  return String(Math.round(value * SCALE) / SCALE);
}

/** A point as an SVG path coordinate pair: `8.485 9`. */
export function formatPathPoint(point: Point): string {
  return `${formatCoordinate(point.horizontal)} ${formatCoordinate(point.vertical)}`;
}
