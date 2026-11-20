import { describe, expect, it } from "vite-plus/test";

import {
  cellCentre,
  distanceBetween,
  screenRotation,
  toImageSpace,
  toScreenSpace,
} from "./screen-geometry.ts";
import type { Point } from "./screen-geometry.ts";

/** 45°, the angle of the unit square's diagonal. */
const EIGHTH_TURN_RADIANS = Math.atan2(1, 1);
const PRECISION_DIGITS = 12;
const PITCH = 8;

/** Points used across the tests, in pixels. */
const POINTS = {
  unitAlongImageX: { horizontal: 1, vertical: 0 },
  anywhere: { horizontal: 37.5, vertical: -12.25 },
  origin: { horizontal: 0, vertical: 0 },
  threeFourFiveTriangleCorner: { horizontal: 3, vertical: 4 },
  firstCellOfSecondRow: { horizontal: 3, vertical: 12 },
  farCornerOfACell: { horizontal: 8, vertical: 15.99 },
  negativeScreenSpace: { horizontal: -1, vertical: -9 },
} satisfies Record<string, Point>;

const DIAGONAL = {
  rotatedUnitPoint: { horizontal: Math.SQRT1_2, vertical: -Math.SQRT1_2 },
  threeFourFiveHypotenuse: 5,
};

const CELL_CENTRES = {
  firstCellOfSecondRow: { horizontal: 4, vertical: 12 },
  secondCellOfSecondRow: { horizontal: 12, vertical: 12 },
  firstNegativeCell: { horizontal: -4, vertical: -12 },
} satisfies Record<string, Point>;

function expectPointCloseTo(actual: Point, expected: Point): void {
  expect(actual.horizontal).toBeCloseTo(expected.horizontal, PRECISION_DIGITS);
  expect(actual.vertical).toBeCloseTo(expected.vertical, PRECISION_DIGITS);
}

describe("screen rotation at 45°", () => {
  const rotation = screenRotation(EIGHTH_TURN_RADIANS);

  it("turns the image x axis onto the screen diagonal", () => {
    expectPointCloseTo(toScreenSpace(POINTS.unitAlongImageX, rotation), DIAGONAL.rotatedUnitPoint);
  });

  it("maps a screen point back to the image point it came from", () => {
    const roundTrip = toImageSpace(toScreenSpace(POINTS.anywhere, rotation), rotation);
    expectPointCloseTo(roundTrip, POINTS.anywhere);
  });

  it("keeps distances", () => {
    const from = toScreenSpace(POINTS.origin, rotation);
    const to = toScreenSpace(POINTS.threeFourFiveTriangleCorner, rotation);
    expect(distanceBetween(from, to)).toBeCloseTo(
      DIAGONAL.threeFourFiveHypotenuse,
      PRECISION_DIGITS,
    );
  });
});

describe("cell centre", () => {
  it("is half a pitch past the cell's lower corner", () => {
    expect(cellCentre(POINTS.firstCellOfSecondRow, PITCH)).toStrictEqual(
      CELL_CENTRES.firstCellOfSecondRow,
    );
  });

  it("is shared by every point in the cell", () => {
    expect(cellCentre(POINTS.farCornerOfACell, PITCH)).toStrictEqual(
      CELL_CENTRES.secondCellOfSecondRow,
    );
  });

  it("follows the lattice into negative screen coordinates", () => {
    expect(cellCentre(POINTS.negativeScreenSpace, PITCH)).toStrictEqual(
      CELL_CENTRES.firstNegativeCell,
    );
  });
});
