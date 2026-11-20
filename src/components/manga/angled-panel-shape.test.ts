import { describe, expect, it } from "vite-plus/test";

import type { Point } from "../../geometry/point.ts";
import { AngledPanelShape } from "./angled-panel-shape.ts";
import type { PanelSlant } from "./angled-panel-shape.ts";

const INSET = 9;

/** Corners clockwise from the top left, in percent of the panel box. */
const EXPECTED_CORNERS: readonly (readonly [PanelSlant, readonly Point[]])[] = [
  [
    { edge: "left", end: "top", inset: INSET },
    [
      { horizontal: 9, vertical: 0 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "left", end: "bottom", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 9, vertical: 100 },
    ],
  ],
  [
    { edge: "right", end: "top", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 91, vertical: 0 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "right", end: "bottom", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 91, vertical: 100 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "top", end: "left", inset: INSET },
    [
      { horizontal: 0, vertical: 9 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "top", end: "right", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 100, vertical: 9 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "bottom", end: "right", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 100, vertical: 91 },
      { horizontal: 0, vertical: 100 },
    ],
  ],
  [
    { edge: "bottom", end: "left", inset: INSET },
    [
      { horizontal: 0, vertical: 0 },
      { horizontal: 100, vertical: 0 },
      { horizontal: 100, vertical: 100 },
      { horizontal: 0, vertical: 91 },
    ],
  ],
];

/** Insets that would not leave a quadrilateral, or are not numbers at all. */
const INSETS_OUT_OF_RANGE = {
  none: 0,
  negative: -5,
  full: 100,
  beyond: 120,
  notANumber: Number.NaN,
};

const CLIP_PATH = /^polygon\((?<corners>.+)\)$/u;

function pointFrom([horizontal, vertical]: readonly string[]): Point {
  return { horizontal: Number(horizontal), vertical: Number(vertical) };
}

/** Corners of `polygon(0% 0%, 100% 0%, …)`. */
function clipCorners(clipPath: string): Point[] {
  const corners = CLIP_PATH.exec(clipPath)?.groups?.["corners"] ?? "";
  return corners.split(", ").map((corner) => pointFrom(corner.replaceAll("%", "").split(" ")));
}

/** Corners of the SVG points `0,0 100,0 …`. */
function outlineCorners(points: string): Point[] {
  return points.split(" ").map((corner) => pointFrom(corner.split(",")));
}

/** The z component of the cross product of the edges that meet at each corner. */
function turnsAtCorners(corners: readonly Point[]): number[] {
  return corners.map((corner, index) => {
    const previous = corners.at(index - 1) ?? corner;
    const next = corners[(index + 1) % corners.length] ?? corner;
    const incoming = {
      horizontal: corner.horizontal - previous.horizontal,
      vertical: corner.vertical - previous.vertical,
    };
    const outgoing = {
      horizontal: next.horizontal - corner.horizontal,
      vertical: next.vertical - corner.vertical,
    };
    return incoming.horizontal * outgoing.vertical - incoming.vertical * outgoing.horizontal;
  });
}

describe.each(EXPECTED_CORNERS)("a panel slanted %o", (slant, corners) => {
  const shape = AngledPanelShape.slanted(slant);

  it("moves only that end of the edge inward", () => {
    expect(shape.corners).toStrictEqual(corners);
  });

  it("stays a convex quadrilateral, clockwise on screen", () => {
    turnsAtCorners(shape.corners).forEach((turn) => {
      expect(turn).toBeGreaterThan(0);
    });
  });

  it("clips the content to the polygon its outline strokes", () => {
    expect(clipCorners(shape.clipPath)).toStrictEqual(corners);
    expect(outlineCorners(shape.outlinePoints)).toStrictEqual(corners);
  });
});

describe("a panel slant inset", () => {
  it("writes fractional percentages without float noise", () => {
    const shape = AngledPanelShape.slanted({ edge: "right", end: "top", inset: 7.3 });
    expect(shape.clipPath).toBe("polygon(0% 0%, 92.7% 0%, 100% 100%, 0% 100%)");
    expect(shape.outlinePoints).toBe("0,0 92.7,0 100,100 0,100");
  });

  it.each(Object.entries(INSETS_OUT_OF_RANGE))("refuses %s (%d)", (_, inset) => {
    expect(() => AngledPanelShape.slanted({ edge: "left", end: "top", inset })).toThrow(RangeError);
  });
});
