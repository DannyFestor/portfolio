import { describe, expect, it } from "vite-plus/test";

import { distanceBetween } from "../../geometry/point.ts";
import type { Point } from "../../geometry/point.ts";
import { CLEAR_RADIUS, FOCUS_CENTRE, focusLines, focusLinesPath } from "./focus-lines.ts";
import { PANEL_BOX_MIDDLE } from "./panel-box.ts";

const LINES = focusLines();
const PRECISION_DIGITS = 9;
const HALF = 0.5;
const DEGREES_PER_TURN = 360;
const DEGREES_PER_HALF_TURN = 180;

/** No gap between neighbouring lines may be wider than this, so the lines go all the way round. */
const WIDEST_GAP_DEGREES = 10;

const HALF_DIAGONAL = PANEL_BOX_MIDDLE * Math.SQRT2;

/** The direction from the focus centre to the point, in degrees from 0 up to 360. */
function angleOf(point: Point): number {
  const radians = Math.atan2(
    point.vertical - FOCUS_CENTRE.vertical,
    point.horizontal - FOCUS_CENTRE.horizontal,
  );
  const degrees = (radians / Math.PI) * DEGREES_PER_HALF_TURN;
  return (degrees + DEGREES_PER_TURN) % DEGREES_PER_TURN;
}

function midpoint(from: Point, to: Point): Point {
  return {
    horizontal: (from.horizontal + to.horizontal) * HALF,
    vertical: (from.vertical + to.vertical) * HALF,
  };
}

/** The shortest distance from the focus centre to the segment between two points. */
function centreDistanceToSegment(from: Point, to: Point): number {
  const along = {
    horizontal: to.horizontal - from.horizontal,
    vertical: to.vertical - from.vertical,
  };
  const toCentre = {
    horizontal: FOCUS_CENTRE.horizontal - from.horizontal,
    vertical: FOCUS_CENTRE.vertical - from.vertical,
  };
  const lengthSquared = along.horizontal * along.horizontal + along.vertical * along.vertical;
  const projection =
    (toCentre.horizontal * along.horizontal + toCentre.vertical * along.vertical) / lengthSquared;
  const share = Math.min(1, Math.max(0, projection));
  const closest = {
    horizontal: from.horizontal + share * along.horizontal,
    vertical: from.vertical + share * along.vertical,
  };
  return distanceBetween(FOCUS_CENTRE, closest);
}

function widestGap(angles: readonly number[]): number {
  const sorted = angles.toSorted((first, second) => first - second);
  const wrapAround = (sorted[0] ?? 0) + DEGREES_PER_TURN - (sorted.at(-1) ?? 0);
  return Math.max(
    wrapAround,
    ...sorted.slice(1).map((angle, index) => angle - (sorted[index] ?? angle)),
  );
}

describe("focus lines", () => {
  it("go all the way round the centre", () => {
    expect(widestGap(LINES.map(({ tip }) => angleOf(tip)))).toBeLessThan(WIDEST_GAP_DEGREES);
  });

  it("keep the centre clear for the lettering", () => {
    LINES.forEach(({ tip, base: [first, second] }) => {
      expect(centreDistanceToSegment(tip, first)).toBeGreaterThanOrEqual(CLEAR_RADIUS);
      expect(centreDistanceToSegment(tip, second)).toBeGreaterThanOrEqual(CLEAR_RADIUS);
      expect(centreDistanceToSegment(first, second)).toBeGreaterThanOrEqual(CLEAR_RADIUS);
    });
  });

  it("point at the centre", () => {
    LINES.forEach(({ tip, base: [first, second] }) => {
      expect(angleOf(midpoint(first, second))).toBeCloseTo(angleOf(tip), PRECISION_DIGITS);
    });
  });

  it("reach past the panel corners, so every line meets the border", () => {
    LINES.forEach(({ base }) => {
      base.forEach((point) => {
        expect(distanceBetween(FOCUS_CENTRE, point)).toBeGreaterThan(HALF_DIAGONAL);
      });
    });
  });

  it("start at irregular distances from the centre, as drawn by hand", () => {
    const tipDistances = new Set(
      LINES.map(({ tip }) => distanceBetween(FOCUS_CENTRE, tip).toFixed(1)),
    );
    expect(tipDistances.size).toBeGreaterThan(LINES.length * HALF);
  });

  it("draw as one SVG path with a closed triangle per line", () => {
    const path = focusLinesPath(LINES);
    expect(path).toMatch(/^(?:M[\d. -]+L[\d. -]+L[\d. -]+Z)+$/u);
    expect(path.match(/Z/gu)).toHaveLength(LINES.length);
  });
});
