import { describe, expect, it } from "vite-plus/test";

import { AI_CRAWLERS, SITEMAP_INDEX_PATH } from "../../src/seo/robots-txt.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { isBuiltUrlPath, readBuiltFile } from "./built-site.ts";

const robots = readBuiltFile("robots.txt");
const GROUP_BREAK = /\n\s*\n/u;
const SITEMAP_LINE = /^Sitemap: (?<url>\S+)$/mu;

/** The rule lines of the group addressed to this user agent. */
function rulesFor(userAgent: string): string[] {
  const group = robots
    .split(GROUP_BREAK)
    .map((block) => block.trim().split("\n"))
    .find(([first]) => first === `User-agent: ${userAgent}`);
  return group?.slice(1) ?? [];
}

describe("robots.txt (#20)", () => {
  it.each(["*", ...AI_CRAWLERS])("lets %s read the whole site", (userAgent) => {
    expect(rulesFor(userAgent)).toStrictEqual(["Allow: /"]);
  });

  it("points to the built sitemap index on festor.info", () => {
    const sitemapUrl = SITEMAP_LINE.exec(robots)?.groups?.["url"];
    expect(sitemapUrl).toBe(siteUrlOf(SITEMAP_INDEX_PATH));
    expect(isBuiltUrlPath(SITEMAP_INDEX_PATH)).toBe(true);
  });
});
