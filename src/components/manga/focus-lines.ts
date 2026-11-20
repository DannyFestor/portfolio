import { formatCoordinate } from "../../geometry/format-coordinate.ts";
import type { Point } from "../../geometry/point.ts";
import { PANEL_BOX_MIDDLE } from "./panel-box.ts";

/** One focus line: a thin ink wedge whose tip points at the panel centre. */
export interface FocusLine {
  readonly tip: Point;
  readonly base: readonly [Point, Point];
}

export const FOCUS_CENTRE: Point = { horizontal: PANEL_BOX_MIDDLE, vertical: PANEL_BOX_MIDDLE };

/** Radius of the clear area around the centre that holds the lettering, in panel viewBox units. */
export const CLEAR_RADIUS = 34;

/** Tips start up to this far beyond the clear radius, at irregular distances as if drawn by hand. */
const TIP_SPREAD = 10;

/** Bases lie beyond the panel corners (half the diagonal is 70.7), so every line reaches the border. */
const BASE_RADIUS = 75;

const LINE_COUNT = 72;

/** How far a line may drift from its even spacing, as a share of the spacing. */
const ANGLE_DRIFT = 0.6;

/** Half the angle a line spans at its base: from the narrowest line to the widest. */
const NARROWEST_HALF_WIDTH_DEGREES = 0.17;
const WIDTH_SPREAD_DEGREES = 0.17;

const GOLDEN_RATIO_CONJUGATE = 0.618_033_988_749_895;

/** Irrational strides give values in [0, 1) that look irregular yet never repeat or cluster. */
const STRIDES = { tip: GOLDEN_RATIO_CONJUGATE, angle: Math.SQRT2, width: Math.SQRT1_2 } as const;

const DEGREES_PER_TURN = 360;
const DEGREES_PER_HALF_TURN = 180;
const CENTRED = 0.5;

function radians(degrees: number): number {
  return (degrees / DEGREES_PER_HALF_TURN) * Math.PI;
}

function irregular(index: number, stride: number): number {
  return (index * stride) % 1;
}

function polar(radius: number, angle: number): Point {
  return {
    horizontal: FOCUS_CENTRE.horizontal + radius * Math.cos(angle),
    vertical: FOCUS_CENTRE.vertical + radius * Math.sin(angle),
  };
}

function focusLine(index: number): FocusLine {
  const spacing = DEGREES_PER_TURN / LINE_COUNT;
  const drift = (irregular(index, STRIDES.angle) - CENTRED) * ANGLE_DRIFT;
  const angle = radians((index + drift) * spacing);
  const halfWidth = radians(
    NARROWEST_HALF_WIDTH_DEGREES + irregular(index, STRIDES.width) * WIDTH_SPREAD_DEGREES,
  );
  return {
    tip: polar(CLEAR_RADIUS + irregular(index, STRIDES.tip) * TIP_SPREAD, angle),
    base: [polar(BASE_RADIUS, angle - halfWidth), polar(BASE_RADIUS, angle + halfWidth)],
  };
}

/** The focus lines of an impact panel, all the way round its centre. */
export function focusLines(): readonly FocusLine[] {
  return Array.from({ length: LINE_COUNT }, (_, index) => focusLine(index));
}

function pathPoint(point: Point): string {
  return `${formatCoordinate(point.horizontal)} ${formatCoordinate(point.vertical)}`;
}

/** The lines as one SVG path, one closed triangle per line. */
export function focusLinesPath(lines: readonly FocusLine[]): string {
  return lines
    .map(
      ({ tip, base: [first, second] }) =>
        `M${pathPoint(tip)}L${pathPoint(first)}L${pathPoint(second)}Z`,
    )
    .join("");
}
