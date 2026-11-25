import { describe, expect, it } from "vite-plus/test";

import { FEATURED_PROJECT_COUNT } from "../career/project-extras.ts";
import { workPanelLook } from "./work-panel-looks.ts";

describe("the looks of Home's work panels (#15)", () => {
  it(`print each of the ${String(FEATURED_PROJECT_COUNT)} featured projects differently`, () => {
    const looks = Array.from({ length: FEATURED_PROJECT_COUNT }, (_, index) =>
      workPanelLook(index),
    );
    expect(new Set(looks.map((look) => JSON.stringify(look))).size).toBe(FEATURED_PROJECT_COUNT);
  });

  it("have none for a panel beyond the featured projects", () => {
    expect(() => workPanelLook(FEATURED_PROJECT_COUNT)).toThrow(RangeError);
  });
});
