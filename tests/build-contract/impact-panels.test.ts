import { describe, expect, it } from "vite-plus/test";

import { findBuiltFiles, readBuiltFile } from "./built-site.ts";

/** The class of the focus lines drawn by src/components/manga/focus-lines.astro. */
const FOCUS_LINES = /\bclass="focus-lines"/gu;

describe("impact panels (one impact moment per page, #7)", () => {
  it.each(findBuiltFiles("**/*.html"))("%s draws focus lines in one panel at most", (page) => {
    expect(readBuiltFile(page).match(FOCUS_LINES)?.length ?? 0).toBeLessThanOrEqual(1);
  });
});
