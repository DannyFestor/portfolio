import { AxeBuilder } from "@axe-core/playwright";
import type { Page } from "playwright";
import { describe, expect, it } from "vite-plus/test";

import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { findBuiltFiles, urlPathOfPage } from "./built-site.ts";

/** WCAG 2.2 level A and AA. Best-practice rules such as page-has-heading-one are not enforced yet. */
const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const inspectBuiltPage = useBuiltSiteBrowser();

async function axeViolations(page: Page): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze();
  return results.violations.map((violation) => `${violation.id}: ${violation.help}`);
}

describe("every built page passes axe", () => {
  it.each(findBuiltFiles("**/*.html").map((page) => urlPathOfPage(page)))("%s", async (urlPath) => {
    expect(await inspectBuiltPage(urlPath, axeViolations)).toStrictEqual([]);
  });
});
