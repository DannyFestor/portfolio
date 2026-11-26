import { describe, expect, it } from "vite-plus/test";

import { SITEMAP_INDEX_PATH } from "../../src/seo/robots-txt.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { alphabetically } from "./blog-contents.ts";
import { builtPages, readBuiltFile } from "./built-site.ts";

const LOCATION = /<loc>(?<url>[^<]*)<\/loc>/gu;

function locationsIn(sitemap: string): string[] {
  return Array.from(sitemap.matchAll(LOCATION), (match) => match.groups?.["url"] ?? "");
}

function builtFileOf(url: string): string {
  return new URL(url).pathname.slice(1);
}

/** The page URLs of every sitemap the index lists. */
function sitemapPageUrls(): string[] {
  const sitemaps = locationsIn(readBuiltFile(builtFileOf(siteUrlOf(SITEMAP_INDEX_PATH))));
  return sitemaps.flatMap((sitemap) => locationsIn(readBuiltFile(builtFileOf(sitemap))));
}

describe("the sitemap (#20)", () => {
  it("lists every page, each case study and post among them, on festor.info", () => {
    const pageUrls = builtPages().map(({ urlPath }) => siteUrlOf(urlPath));
    expect(alphabetically(sitemapPageUrls())).toStrictEqual(alphabetically(pageUrls));
  });
});
