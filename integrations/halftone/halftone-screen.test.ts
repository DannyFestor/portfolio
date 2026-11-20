import { describe, expect, it } from "vite-plus/test";

import { screenRaster } from "./halftone-screen.ts";
import type { GrayRaster } from "./halftone-screen.ts";
import { expectStrictlyRising } from "./test-support/expect-strictly-rising.ts";

const SCREEN = { name: "test", pitch: 6 };
const SIZE = { width: 48, height: 48 };

const LUMINANCE = { white: 1, black: 0 };
const TONES_FROM_LIGHT_TO_DARK = { light: 0.8, lightMid: 0.6, darkMid: 0.4, dark: 0.2 };

/** Neighbouring dots overlap at full darkness, leaving only specks of paper at the cell corners. */
const MINIMUM_SOLID_COVERAGE = 0.95;

function uniformRaster(luminance: number): GrayRaster {
  return { size: SIZE, luminanceAt: () => luminance };
}

function meanCoverage(luminance: number): number {
  const coverage = screenRaster(uniformRaster(luminance), SCREEN);
  return coverage.reduce((total, share) => total + share, 0) / coverage.length;
}

describe("screening a uniform tone", () => {
  it("leaves white paper bare", () => {
    expect(meanCoverage(LUMINANCE.white)).toBe(0);
  });

  it("closes black up into nearly solid ink", () => {
    expect(meanCoverage(LUMINANCE.black)).toBeGreaterThan(MINIMUM_SOLID_COVERAGE);
  });

  it("inks more of the page the darker the tone", () => {
    expectStrictlyRising(Object.values(TONES_FROM_LIGHT_TO_DARK).map((tone) => meanCoverage(tone)));
  });
});
