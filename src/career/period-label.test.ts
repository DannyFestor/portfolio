import { describe, expect, it } from "vite-plus/test";

import { periodLabel } from "./period-label.ts";

describe("a period label (decided in #25)", () => {
  it.each([
    [{ start: "2025-06", end: null }, "2025 — now"],
    [{ start: "2024-05", end: "2025-06" }, "2024 — 25"],
    [{ start: "2018-10", end: "2020-04" }, "2018 — 20"],
    [{ start: "2000-01", end: "2009-12" }, "2000 — 09"],
  ])("shortens the end year within one century: %j", (period, label) => {
    expect(periodLabel(period)).toBe(label);
  });

  it.each([
    [{ start: "1998-04", end: "2003-03" }, "1998 — 2003"],
    [{ start: "2099-01", end: "2100-02" }, "2099 — 2100"],
  ])("writes the end year in full across centuries: %j", (period, label) => {
    expect(periodLabel(period)).toBe(label);
  });

  it("says now for a period that is still running", () => {
    expect(periodLabel({ start: "1999-01", end: null })).toBe("1999 — now");
  });
});
