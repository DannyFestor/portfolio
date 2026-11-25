import { describe, expect, it } from "vite-plus/test";

import { BLOG_FEED } from "../../src/blog/blog-content.ts";
import { SITE_URL } from "../../src/consts.ts";
import { alphabetically, POST_URL_PATHS } from "./blog-contents.ts";
import { findBuiltFiles, readBuiltFile } from "./built-site.ts";
import { attributeValue, elementsWithAttribute } from "./html-elements.ts";

const FEED_LINK = /<link>(?<link>[^<]*)<\/link>/gu;
const FEED_URL = new URL(BLOG_FEED.href, SITE_URL).href;

function announcesTheFeed(page: string): boolean {
  return elementsWithAttribute(readBuiltFile(page), "type", "application/rss+xml").some(
    (link) => attributeValue(link, "href") === FEED_URL,
  );
}

describe("the RSS feed (#16)", () => {
  const feed = readBuiltFile(BLOG_FEED.href.slice(1));
  const links = Array.from(feed.matchAll(FEED_LINK), (match) => match.groups?.["link"] ?? "");

  it("links the site and every post page on festor.info", () => {
    const postUrls = POST_URL_PATHS.map((urlPath) => new URL(urlPath, SITE_URL).href);
    expect(alphabetically(links)).toStrictEqual(alphabetically([`${SITE_URL}/`, ...postUrls]));
  });

  it("is announced in the head of every page", () => {
    const pages = findBuiltFiles("**/*.html");
    expect(pages.filter((page) => !announcesTheFeed(page))).toStrictEqual([]);
  });
});
