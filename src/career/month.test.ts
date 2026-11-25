import { describe, expect, it } from "vite-plus/test";

import { yearOf } from "./month.ts";

const YEAR = 2017;

describe("a month", () => {
  it("falls in the year it starts with", () => {
    expect(yearOf(`${String(YEAR)}-02`)).toBe(YEAR);
  });
});
