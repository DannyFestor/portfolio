import { formatPathPoint } from "../../geometry/format-coordinate.ts";
import type { Point } from "../../geometry/point.ts";

/** The arrow is drawn in a 46 × 30 viewBox: wider than tall, like a quick pen stroke. */
export const ASIDE_ARROW_VIEW_BOX = "0 0 46 30";

/**
 * A cubic Bézier curve: it leaves `start` toward `startControl` and arrives at `end` from
 * `endControl`.
 */
export interface CubicCurve {
  readonly start: Point;
  readonly startControl: Point;
  readonly endControl: Point;
  readonly end: Point;
}

/** The small hand-drawn arrow of an aside: a curved shaft and an open head at its tip. */
export interface AsideArrow {
  readonly shaft: CubicCurve;
  readonly barbs: readonly [Point, Point];
}

/** The shaft sweeps from the top right down to the tip at the bottom left, flattening out on top. */
const SHAFT: CubicCurve = {
  start: { horizontal: 44, vertical: 4 },
  startControl: { horizontal: 30, vertical: 4 },
  endControl: { horizontal: 14, vertical: 8 },
  end: { horizontal: 6, vertical: 25 },
};

const BARB_LENGTH = 8;

/** The angle between each barb and the shaft, at the tip. */
const BARB_SPREAD_DEGREES = 35;

const DEGREES_PER_HALF_TURN = 180;

function radians(degrees: number): number {
  return (degrees / DEGREES_PER_HALF_TURN) * Math.PI;
}

/** The direction the shaft points back along from its tip, as an angle in radians. */
function backwardAngleAtTip(shaft: CubicCurve): number {
  return Math.atan2(
    shaft.endControl.vertical - shaft.end.vertical,
    shaft.endControl.horizontal - shaft.end.horizontal,
  );
}

function barb(tip: Point, angle: number): Point {
  return {
    horizontal: tip.horizontal + BARB_LENGTH * Math.cos(angle),
    vertical: tip.vertical + BARB_LENGTH * Math.sin(angle),
  };
}

export function asideArrow(): AsideArrow {
  const backward = backwardAngleAtTip(SHAFT);
  const spread = radians(BARB_SPREAD_DEGREES);
  return {
    shaft: SHAFT,
    barbs: [barb(SHAFT.end, backward - spread), barb(SHAFT.end, backward + spread)],
  };
}

/** The shaft as an SVG path. */
export function shaftPath({ start, startControl, endControl, end }: CubicCurve): string {
  const curve = [startControl, endControl, end].map((point) => formatPathPoint(point));
  return `M${formatPathPoint(start)}C${curve.join(" ")}`;
}

/** The head as an SVG path: from one barb to the tip and out to the other barb. */
export function headPath({ shaft, barbs: [first, second] }: AsideArrow): string {
  return `M${formatPathPoint(first)}L${formatPathPoint(shaft.end)}L${formatPathPoint(second)}`;
}
