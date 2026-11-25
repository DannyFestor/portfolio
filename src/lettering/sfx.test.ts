import { describe, expect, it } from "vite-plus/test";

import { ZEN_ANTIQUE } from "../fonts/font-subsets.ts";
import { APPROVED_SFX, isApprovedSfx } from "./sfx.ts";

/** Japanese that is approved for other lettering, or not approved at all, but is no SFX. */
const NOT_SFX = ["次回予告", "目次", "ガーン", "カチ", "カチッ ", ""];

describe("the SFX catalogue", () => {
  it("lists each SFX once", () => {
    expect(new Set(APPROVED_SFX).size).toBe(APPROVED_SFX.length);
  });

  it.each(APPROVED_SFX)("sets %s in the Zen Antique subset", (sfx) => {
    expect(ZEN_ANTIQUE.japaneseText).toContain(sfx);
  });

  it.each(APPROVED_SFX)("approves %s", (sfx) => {
    expect(isApprovedSfx(sfx)).toBe(true);
  });

  it.each(NOT_SFX)("refuses %j", (text) => {
    expect(isApprovedSfx(text)).toBe(false);
  });
});
