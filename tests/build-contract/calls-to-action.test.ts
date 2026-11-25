import { describe, expect, it } from "vite-plus/test";

import { findBuiltFiles, readBuiltFile } from "./built-site.ts";
import { buttonImitations } from "./button-imitations.ts";

describe("calls to action are inked links, never buttons (#27)", () => {
  it.each(findBuiltFiles("**/*.html"))("%s imitates no button", (page) => {
    expect(buttonImitations(readBuiltFile(page))).toStrictEqual([]);
  });
});
