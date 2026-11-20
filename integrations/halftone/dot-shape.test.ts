import { describe, expect, it } from "vite-plus/test";

import { darknessOf, dotRadius, inkCoverage } from "./dot-shape.ts";

const PRECISION_DIGITS = 12;
const PITCH = 8;

const LUMINANCE = { white: 1, black: 0, midGrey: 0.5 };

/** 0.5 ^ 1.45: a mid grey prints at about a third of full ink. */
const MID_GREY_DARKNESS = { value: 0.366_021, digits: 6 };

const DARKNESS = { paper: 0, quarter: 0.25, ink: 1 };

/** 72% of the pitch, and half that for a quarter of the darkness (half the radius, ¼ the area). */
const RADIUS = { fullDot: 5.76, quarterDot: 2.88 };

/** Distances from the centre of a dot of radius 3, in pixels. */
const EDGE = { radius: 3, halfPixelInside: 2.5, quarterPixelOutside: 3.25, halfPixelOutside: 3.5 };

const COVERAGE = { paper: 0, quarter: 0.25, half: 0.5, ink: 1 };

const SUB_PIXEL_DOT = { radius: 0.2, centre: 0 };

describe("darkness", () => {
  it("is 0 for white and 1 for black", () => {
    expect(darknessOf(LUMINANCE.white)).toBe(DARKNESS.paper);
    expect(darknessOf(LUMINANCE.black)).toBe(DARKNESS.ink);
  });

  it("prints midtones lighter than a linear response", () => {
    expect(darknessOf(LUMINANCE.midGrey)).toBeCloseTo(
      MID_GREY_DARKNESS.value,
      MID_GREY_DARKNESS.digits,
    );
  });
});

describe("dot radius", () => {
  it("is 0 on paper and 72% of the pitch at full darkness", () => {
    expect(dotRadius(DARKNESS.paper, PITCH)).toBe(0);
    expect(dotRadius(DARKNESS.ink, PITCH)).toBeCloseTo(RADIUS.fullDot, PRECISION_DIGITS);
  });

  it("grows the dot's area, not its radius, in step with darkness", () => {
    expect(dotRadius(DARKNESS.quarter, PITCH)).toBeCloseTo(RADIUS.quarterDot, PRECISION_DIGITS);
  });
});

describe("ink coverage at the dot's anti-aliased edge", () => {
  it("is full ink half a pixel inside the edge", () => {
    expect(inkCoverage(EDGE.radius, EDGE.halfPixelInside)).toBe(COVERAGE.ink);
  });

  it("is half ink on the edge", () => {
    expect(inkCoverage(EDGE.radius, EDGE.radius)).toBe(COVERAGE.half);
  });

  it("ramps linearly across the one-pixel edge", () => {
    expect(inkCoverage(EDGE.radius, EDGE.quarterPixelOutside)).toBe(COVERAGE.quarter);
  });

  it("is paper half a pixel outside the edge", () => {
    expect(inkCoverage(EDGE.radius, EDGE.halfPixelOutside)).toBe(COVERAGE.paper);
  });

  it("never exceeds the area of a dot smaller than a pixel", () => {
    const dotArea = Math.PI * SUB_PIXEL_DOT.radius * SUB_PIXEL_DOT.radius;
    expect(inkCoverage(SUB_PIXEL_DOT.radius, SUB_PIXEL_DOT.centre)).toBeCloseTo(
      dotArea,
      PRECISION_DIGITS,
    );
  });

  it("leaves the paper bare where the dot has vanished", () => {
    expect(inkCoverage(0, SUB_PIXEL_DOT.centre)).toBe(COVERAGE.paper);
  });
});
