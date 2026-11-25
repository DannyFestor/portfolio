import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { afterAll, beforeAll } from "vite-plus/test";

import { BUILT_SITE_ORIGIN, serveBuiltSite } from "./built-site-server.ts";

const BROWSER_STARTUP_TIMEOUT_MS = 30_000;

/** How a page is browsed; the defaults are a desktop viewport with JavaScript on. */
export interface Browsing {
  readonly viewport?: { readonly width: number; readonly height: number };
  readonly javaScriptEnabled?: boolean;
}

/** Opens a built page, hands it to `inspect`, and closes it again. */
export type BuiltPageInspector = <Result>(
  urlPath: string,
  inspect: (page: Page) => Promise<Result>,
  browsing?: Browsing,
) => Promise<Result>;

interface BuiltPageVisit {
  readonly urlPath: string;
  readonly browsing: Browsing;
}

async function inspectBuiltPage<Result>(
  browser: Browser,
  { urlPath, browsing }: BuiltPageVisit,
  inspect: (page: Page) => Promise<Result>,
): Promise<Result> {
  const context = await browser.newContext(browsing);
  await serveBuiltSite(context);
  const page = await context.newPage();
  await page.goto(`${BUILT_SITE_ORIGIN}${urlPath}`);
  const result = await inspect(page);
  await context.close();
  return result;
}

/** Starts one browser for the calling test file, serving dist/ to its pages. */
export function useBuiltSiteBrowser(): BuiltPageInspector {
  let browser: Browser | undefined;

  beforeAll(async () => {
    browser = await chromium.launch();
  }, BROWSER_STARTUP_TIMEOUT_MS);

  afterAll(async () => {
    await browser?.close();
  });

  return (urlPath, inspect, browsing = {}) => {
    if (browser === undefined) {
      throw new Error("The browser did not start.");
    }
    return inspectBuiltPage(browser, { urlPath, browsing }, inspect);
  };
}
