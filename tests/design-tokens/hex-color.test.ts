import { describe, expect, it } from "vite-plus/test";

import { mixHexColors, parseHexColor } from "./hex-color.ts";

const HALF = 0.5;

describe("hex colors", () => {
  it("parses the three channels", () => {
    expect(parseHexColor("#2d4a7a")).toStrictEqual({ red: 45, green: 74, blue: 122 });
  });

  it("mixes nothing of the top color at share 0", () => {
    expect(mixHexColors("#000000", "#f3f2ee", 0)).toBe("#f3f2ee");
  });

  it("mixes only the top color at share 1", () => {
    expect(mixHexColors("#2d4a7a", "#f3f2ee", 1)).toBe("#2d4a7a");
  });

  it("mixes channel by channel, rounded", () => {
    expect(mixHexColors("#000000", "#ffffff", HALF)).toBe("#808080");
  });
});
