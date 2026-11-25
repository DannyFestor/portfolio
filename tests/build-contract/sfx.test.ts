import { describe, expect, it } from "vite-plus/test";

import { isApprovedSfx, MAX_SFX_PER_PAGE, SFX_CLASS } from "../../src/lettering/sfx.ts";
import { findBuiltFiles, readBuiltFile } from "./built-site.ts";
import { elementsWithClass, isAriaHidden } from "./html-elements.ts";

const pages = findBuiltFiles("**/*.html").map((page) => ({
  page,
  sfx: elementsWithClass(readBuiltFile(page), SFX_CLASS),
}));

describe("SFX (decorative, in the page's one impact moment, #31)", () => {
  it.each(pages)(`$page letters ${String(MAX_SFX_PER_PAGE)} SFX at most`, ({ sfx }) => {
    expect(sfx.length).toBeLessThanOrEqual(MAX_SFX_PER_PAGE);
  });

  it.each(pages)("$page hides every SFX from assistive technology", ({ sfx }) => {
    expect(sfx.filter((element) => !isAriaHidden(element))).toStrictEqual([]);
  });

  it.each(pages)("$page letters only SFX from src/lettering/sfx.ts", ({ sfx }) => {
    expect(sfx.map(({ text }) => text).filter((text) => !isApprovedSfx(text))).toStrictEqual([]);
  });
});
