import { describe, expect, it } from "vite-plus/test";

import { canonicalUrlOf, linkPreviewTags } from "./link-preview.ts";
import type { PageHead } from "./page-head.ts";

const HEAD: PageHead = {
  title: "A post — Danny Festor",
  description: "What the post is about.",
  openGraphType: "article",
};

describe("a page's canonical URL (#20)", () => {
  it("is the page's own path on festor.info", () => {
    expect(canonicalUrlOf(HEAD, "/blog/a-post/")).toBe("https://festor.info/blog/a-post/");
  });

  it("is the named page's path when the page shows another page's content", () => {
    expect(canonicalUrlOf({ ...HEAD, canonicalPath: "/work/a-study/" }, "/work/")).toBe(
      "https://festor.info/work/a-study/",
    );
  });
});

describe("a page's link preview (#20)", () => {
  it("tells Open Graph and the Twitter card the page's title, description and URL", () => {
    expect(linkPreviewTags(HEAD, "https://festor.info/blog/a-post/")).toStrictEqual([
      { property: "og:type", content: "article" },
      { property: "og:title", content: "A post — Danny Festor" },
      { property: "og:description", content: "What the post is about." },
      { property: "og:url", content: "https://festor.info/blog/a-post/" },
      { property: "og:site_name", content: "Danny Festor" },
      { name: "twitter:card", content: "summary" },
    ]);
  });
});
