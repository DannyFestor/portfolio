import { describe, expect, it } from "vite-plus/test";

import { TEST_SETTINGS } from "../../integrations/screentone/test-support/test-settings.ts";
import { toneDotCoverage, toneSurfaceColor } from "./screentone-surface.ts";
import { contrastRatio } from "./wcag-contrast.ts";

const PAPER = "#ffffff";
const DEEP_COVERAGE = 0.196_35;
const DECIMALS = 5;

describe("screentone surface", () => {
  it("covers π r² of every pitch × pitch cell", () => {
    // Deep: π · 2.5² / 10².
    expect(toneDotCoverage(TEST_SETTINGS, "deep")).toBeCloseTo(DEEP_COVERAGE, DECIMALS);
  });

  it("mixes the dot color into the paper by coverage and opacity", () => {
    // Deep: π · 2.5² / 10² ≈ 0.196 covered, at opacity 0.5 ≈ 0.098 of #123456 over white.
    expect(toneSurfaceColor(PAPER, TEST_SETTINGS, "deep")).toBe("#e8ebee");
  });

  it("sets denser tones further off the paper", () => {
    const light = toneSurfaceColor(PAPER, TEST_SETTINGS, "light");
    const deep = toneSurfaceColor(PAPER, TEST_SETTINGS, "deep");
    expect(contrastRatio(deep, PAPER)).toBeGreaterThan(contrastRatio(light, PAPER));
  });
});
