import { describe, expect, it } from "vite-plus/test";

import { SITE_AUTHOR, SITE_URL } from "../../src/consts.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { builtPages } from "./built-site.ts";
import { elementsWithAttribute } from "./html-elements.ts";
import { canonicalUrl, metaContent, pageTitle } from "./page-head.ts";

const HTML_ELEMENT = /<html\b(?<attributes>[^>]*)>/u;
const HREFLANG = /\bhreflang=/u;

/** /work shows the newest study, under that study's canonical URL (#17). */
const PAGES_SHOWING_ANOTHER_PAGE = new Set(["/work/"]);

const pages = builtPages();
const pagesShowingTheirOwnContent = pages.filter(
  ({ urlPath }) => !PAGES_SHOWING_ANOTHER_PAGE.has(urlPath),
);

function linkPreview(html: string): Record<string, string | undefined> {
  return {
    "og:title": metaContent(html, "property", "og:title"),
    "og:description": metaContent(html, "property", "og:description"),
    "og:url": metaContent(html, "property", "og:url"),
    "og:site_name": metaContent(html, "property", "og:site_name"),
    "twitter:card": metaContent(html, "name", "twitter:card"),
  };
}

describe("every page's head (#20)", () => {
  it.each(pages)("$urlPath is in English, with no language alternates", ({ html }) => {
    expect(HTML_ELEMENT.exec(html)?.groups?.["attributes"]).toBe(' lang="en"');
    expect(HREFLANG.test(html)).toBe(false);
  });

  it.each(pagesShowingTheirOwnContent)(
    "$urlPath is canonical at its own URL",
    ({ urlPath, html }) => {
      expect(canonicalUrl(html)).toBe(siteUrlOf(urlPath));
    },
  );

  it.each(pages)("$urlPath has one canonical URL, on festor.info", ({ html }) => {
    expect(elementsWithAttribute(html, "rel", "canonical")).toHaveLength(1);
    expect(canonicalUrl(html)?.startsWith(`${SITE_URL}/`)).toBe(true);
  });

  it.each(pages)("$urlPath previews its title, description and canonical URL", ({ html }) => {
    expect(linkPreview(html)).toStrictEqual({
      "og:title": pageTitle(html),
      "og:description": metaContent(html, "name", "description"),
      "og:url": canonicalUrl(html),
      "og:site_name": SITE_AUTHOR,
      "twitter:card": "summary",
    });
  });

  it.each(pages)("$urlPath has an Open Graph type", ({ html }) => {
    expect(["website", "article"]).toContain(metaContent(html, "property", "og:type"));
  });
});
