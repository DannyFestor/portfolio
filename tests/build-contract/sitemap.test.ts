import { describe, expect, it } from "vite-plus/test";

import { sitemapPageUrls } from "../../scripts/smoke-test/sitemap-urls.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { alphabetically } from "./blog-contents.ts";
import { builtPages, readBuiltUrlPath } from "./built-site.ts";

describe("the sitemap (#20)", () => {
  it("lists every page, each case study and post among them, on festor.info", () => {
    const pageUrls = builtPages().map(({ urlPath }) => siteUrlOf(urlPath));
    expect(alphabetically(sitemapPageUrls(readBuiltUrlPath))).toStrictEqual(
      alphabetically(pageUrls),
    );
  });
});
