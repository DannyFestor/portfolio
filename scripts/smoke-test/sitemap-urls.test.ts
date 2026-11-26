import { describe, expect, it } from "vite-plus/test";

import { SITEMAP_INDEX_PATH } from "../../src/seo/robots-txt.ts";
import { sitemapPageUrls } from "./sitemap-urls.ts";

const BUILT_FILES: Readonly<Record<string, string>> = {
  [SITEMAP_INDEX_PATH]: [
    "<sitemapindex>",
    "<sitemap><loc>https://festor.info/sitemap-0.xml</loc></sitemap>",
    "<sitemap><loc>https://festor.info/sitemap-1.xml</loc></sitemap>",
    "</sitemapindex>",
  ].join(""),
  "/sitemap-0.xml": "<urlset><url><loc>https://festor.info/</loc></url></urlset>",
  "/sitemap-1.xml": [
    "<urlset>",
    "<url><loc>https://festor.info/about/</loc></url>",
    "<url><loc>https://festor.info/blog/first-post/</loc></url>",
    "</urlset>",
  ].join(""),
};

function readBuiltFile(urlPath: string): string {
  const file = BUILT_FILES[urlPath];
  if (file === undefined) {
    throw new Error(`No built file at ${urlPath}`);
  }
  return file;
}

describe("the sitemap's page URLs", () => {
  it("come from every sitemap the index lists, in order", () => {
    expect(sitemapPageUrls(readBuiltFile)).toStrictEqual([
      "https://festor.info/",
      "https://festor.info/about/",
      "https://festor.info/blog/first-post/",
    ]);
  });
});
