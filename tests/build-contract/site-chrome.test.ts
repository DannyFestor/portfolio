import { describe, expect, it } from "vite-plus/test";

import { findBuiltFiles, readBuiltFile, urlPathOfPage } from "./built-site.ts";
import {
  attributeValue,
  chromeHtml,
  elementsWithAttribute,
  elementsWithClass,
  hasClass,
  isAriaHidden,
} from "./html-elements.ts";
import type { HtmlElement } from "./html-elements.ts";

const pages = findBuiltFiles("**/*.html").map((page) => ({
  urlPath: urlPathOfPage(page),
  html: readBuiltFile(page),
}));

const chapterPages = pages.filter(({ urlPath }) => urlPath !== "/");

/** The chrome's links to the current page; a page may mark its own links in <main> as well. */
function currentPageLinks(html: string): HtmlElement[] {
  return elementsWithAttribute(chromeHtml(html), "aria-current", "page");
}

/** A link leads to the page itself or to the chapter the page is in. */
function leadsToPageOrItsChapter(urlPath: string, href: string | undefined): boolean {
  return href !== undefined && (urlPath === href || urlPath.startsWith(`${href}/`));
}

describe("the running header and chapter tabs (#28, #29)", () => {
  it.each(pages)("$urlPath marks exactly one link as the current page", ({ html }) => {
    expect(currentPageLinks(html)).toHaveLength(1);
  });

  it.each(pages)("$urlPath marks the link to the page or its chapter", ({ urlPath, html }) => {
    const hrefs = currentPageLinks(html).map((link) => attributeValue(link, "href"));
    expect(hrefs.filter((href) => !leadsToPageOrItsChapter(urlPath, href))).toStrictEqual([]);
  });

  it.each(chapterPages)("$urlPath marks its chapter's tab", ({ html }) => {
    expect(currentPageLinks(html).every((link) => hasClass(link, "chapter-tab"))).toBe(true);
  });
});

describe("the back cover (#30)", () => {
  it.each(pages)("$urlPath prints one barcode, hidden from assistive technology", ({ html }) => {
    expect(
      elementsWithClass(html, "barcode").map((barcode) => isAriaHidden(barcode)),
    ).toStrictEqual([true]);
  });
});
