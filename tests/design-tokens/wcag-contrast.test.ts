import { describe, expect, it } from "vite-plus/test";

import { contrastRatio } from "./wcag-contrast.ts";

const MAXIMUM_RATIO = 21;
const DECIMALS = 2;

describe("contrastRatio", () => {
  it("is 21:1 for black on white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(MAXIMUM_RATIO, DECIMALS);
  });

  it("is 1:1 for a color on itself", () => {
    expect(contrastRatio("#2d4a7a", "#2d4a7a")).toBe(1);
  });

  it("does not depend on which color is the text", () => {
    expect(contrastRatio("#d1352b", "#f3f2ee")).toBe(contrastRatio("#f3f2ee", "#d1352b"));
  });

  it("rejects colors that are not six-digit hex", () => {
    expect(() => contrastRatio("red", "#ffffff")).toThrow("Not a six-digit hex color: red");
  });
});
