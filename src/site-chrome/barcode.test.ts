import { describe, expect, it } from "vite-plus/test";

import { BARCODE_MODULES, barcodeBars } from "./barcode.ts";

const GUARD = "101";

describe("the decorative barcode", () => {
  it("draws one bar per run of ink modules, where the run starts", () => {
    expect(
      barcodeBars("1011100").map(({ start, width }) => `${String(start)}+${String(width)}`),
    ).toStrictEqual(["0+1", "2+3"]);
  });

  it("opens and closes with guard bars", () => {
    expect([
      BARCODE_MODULES.slice(0, GUARD.length),
      BARCODE_MODULES.slice(-GUARD.length),
    ]).toStrictEqual([GUARD, GUARD]);
  });
});
