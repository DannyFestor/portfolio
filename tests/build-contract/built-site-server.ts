import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

import type { BrowserContext } from "playwright";

import { BUILT_SITE_DIRECTORY } from "./built-site.ts";

export const BUILT_SITE_ORIGIN = "http://built-site.test";

const NOT_FOUND = 404;

function builtFileFor(urlPath: string): string {
  const candidate = join(BUILT_SITE_DIRECTORY, decodeURIComponent(urlPath));
  const isDirectory = existsSync(candidate) && statSync(candidate).isDirectory();
  return isDirectory ? join(candidate, "index.html") : candidate;
}

/** Answers every request to BUILT_SITE_ORIGIN from dist/, as a static host would. */
export async function serveBuiltSite(context: BrowserContext): Promise<void> {
  await context.route(`${BUILT_SITE_ORIGIN}/**`, async (route) => {
    const file = builtFileFor(new URL(route.request().url()).pathname);
    await (existsSync(file) ? route.fulfill({ path: file }) : route.fulfill({ status: NOT_FOUND }));
  });
}
