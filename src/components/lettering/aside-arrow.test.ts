import { describe, expect, it } from "vite-plus/test";

import { distanceBetween } from "../../geometry/point.ts";
import type { Point } from "../../geometry/point.ts";
import { ASIDE_ARROW_VIEW_BOX, asideArrow, headPath, shaftPath } from "./aside-arrow.ts";

const ARROW = asideArrow();
const TIP = ARROW.shaft.end;
const PRECISION_DIGITS = 9;
const [, , VIEW_BOX_WIDTH = 0, VIEW_BOX_HEIGHT = 0] = ASIDE_ARROW_VIEW_BOX.split(" ").map(Number);

function angleFromTip(point: Point): number {
  return Math.atan2(point.vertical - TIP.vertical, point.horizontal - TIP.horizontal);
}

function allPoints(): Point[] {
  const { start, startControl, endControl, end } = ARROW.shaft;
  return [start, startControl, endControl, end, ...ARROW.barbs];
}

describe("the aside arrow", () => {
  it("has two barbs of the same length", () => {
    const [first, second] = ARROW.barbs;
    expect(distanceBetween(TIP, first)).toBeCloseTo(distanceBetween(TIP, second), PRECISION_DIGITS);
  });

  it("spreads its barbs evenly around the shaft, so the head points along it", () => {
    const backward = angleFromTip(ARROW.shaft.endControl);
    const [first, second] = ARROW.barbs.map((barb) => angleFromTip(barb) - backward);
    expect(first).toBeCloseTo(-(second ?? 0), PRECISION_DIGITS);
  });

  it("stays inside its viewBox", () => {
    allPoints().forEach(({ horizontal, vertical }) => {
      expect(horizontal).toBeGreaterThanOrEqual(0);
      expect(horizontal).toBeLessThanOrEqual(VIEW_BOX_WIDTH);
      expect(vertical).toBeGreaterThanOrEqual(0);
      expect(vertical).toBeLessThanOrEqual(VIEW_BOX_HEIGHT);
    });
  });

  it("draws the shaft as one cubic curve", () => {
    expect(shaftPath(ARROW.shaft)).toBe("M44 4C30 4 14 8 6 25");
  });

  it("draws the head through the shaft's tip", () => {
    expect(headPath(ARROW)).toMatch(/^M[\d. ]+L6 25L[\d. ]+$/u);
  });
});
