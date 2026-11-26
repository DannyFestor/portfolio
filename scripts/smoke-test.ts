/**
 * `vp run smoke:production`: the post-deploy smoke test (#21). Every page in the built sitemap, the
 * feed, llms.txt, robots.txt, the share image and both résumés must answer 200 on festor.info. The
 * URLs come from dist/, the build the deploy job published.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { smokeTestUrls } from "./smoke-test/smoke-test-urls.ts";
import { directStatus, urlsNotOk } from "./smoke-test/url-status.ts";

function readBuiltFile(urlPath: string): string {
  return readFileSync(join("dist", urlPath), "utf8");
}

const urls = smokeTestUrls(readBuiltFile);
const failures = await urlsNotOk(urls, directStatus);

for (const { url, status } of failures) {
  process.stderr.write(`smoke:production: ${String(status)} ${url}\n`);
}
process.stdout.write(
  `smoke:production: ${String(urls.length - failures.length)} of ${String(urls.length)} URLs answered 200\n`,
);
process.exitCode = failures.length === 0 ? 0 : 1;
