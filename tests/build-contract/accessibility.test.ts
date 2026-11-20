import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";
import type { Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

import { BUILT_SITE_ORIGIN, serveBuiltSite } from "./built-site-server.ts";
import { findBuiltFiles, urlPathOfPage } from "./built-site.ts";

const BROWSER_STARTUP_TIMEOUT_MS = 30_000;

/** WCAG 2.2 level A and AA. Best-practice rules such as page-has-heading-one are not enforced yet. */
const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

let browser: Browser | undefined;

async function axeViolationsOn(urlPath: string): Promise<string[]> {
  if (browser === undefined) {
    throw new Error("The browser did not start.");
  }
  const context = await browser.newContext();
  await serveBuiltSite(context);
  const page = await context.newPage();
  await page.goto(`${BUILT_SITE_ORIGIN}${urlPath}`);
  const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze();
  await context.close();
  return results.violations.map((violation) => `${violation.id}: ${violation.help}`);
}

beforeAll(async () => {
  browser = await chromium.launch();
}, BROWSER_STARTUP_TIMEOUT_MS);

afterAll(async () => {
  await browser?.close();
});

describe("every built page passes axe", () => {
  it.each(findBuiltFiles("**/*.html").map((page) => urlPathOfPage(page)))("%s", async (urlPath) => {
    expect(await axeViolationsOn(urlPath)).toStrictEqual([]);
  });
});
