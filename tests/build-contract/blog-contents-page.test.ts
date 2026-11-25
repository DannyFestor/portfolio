import { describe, expect, it } from "vite-plus/test";

import { contentsNumber } from "../../src/blog/episode-number.ts";
import {
  alphabetically,
  contentsHtml,
  contentsLines,
  POST_PAGES,
  POST_URL_PATHS,
} from "./blog-contents.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { readBuiltFile } from "./built-site.ts";
import {
  attributeValue,
  elementsWithAttribute,
  elementsWithClass,
  mainHtml,
} from "./html-elements.ts";
import { READ_TEXT_IN_MAIN, turnedElements } from "./turned-elements.ts";

const inspectBuiltPage = useBuiltSiteBrowser();

/** The narrowest phone, browsed with JavaScript off. */
const NARROWEST_PHONE = { viewport: { width: 320, height: 640 }, javaScriptEnabled: false };

function contentsDates(): string[] {
  return elementsWithClass(contentsHtml, "contents-date").map(
    (date) => attributeValue(date, "datetime") ?? "",
  );
}

/** Runs in the page: how far the page is wider than the viewport. */
function horizontalOverflow(): number {
  return document.documentElement.scrollWidth - innerWidth;
}

describe("/blog, the table of contents (#16)", () => {
  it("lists every post, newest first", () => {
    const dates = contentsDates();
    expect(dates).toHaveLength(POST_PAGES.length);
    expect(dates).not.toContain("");
    expect(dates).toStrictEqual(alphabetically(dates).toReversed());
  });

  it("links each post page", () => {
    const hrefs = contentsLines().map(({ href }) => href);
    expect(alphabetically(hrefs)).toStrictEqual(alphabetically(POST_URL_PATHS));
  });

  it("numbers the posts in the order they were published, the first post 01", () => {
    const numbers = contentsLines().map(({ number }) => number);
    const episodes = numbers.map((_, index) => contentsNumber(numbers.length - index));
    expect(numbers).toStrictEqual(episodes);
  });

  it("letters 目次 as decoration beside the English heading", () => {
    const [kanji] = elementsWithClass(contentsHtml, "contents-kanji");
    expect(kanji?.text).toBe("目次");
    expect(kanji === undefined ? undefined : attributeValue(kanji, "aria-hidden")).toBe("true");
  });
});

describe("the Blog pages on screen (#16)", () => {
  it.each(["/blog/", ...POST_URL_PATHS])(
    "%s rotates nothing that must be read and sets none of it vertically",
    async (urlPath) => {
      expect(
        await inspectBuiltPage(urlPath, (page) => page.evaluate(turnedElements, READ_TEXT_IN_MAIN)),
      ).toStrictEqual([]);
    },
  );

  it.each(["/blog/", ...POST_URL_PATHS])(
    "%s fits a 320px phone without scrolling sideways",
    async (urlPath) => {
      expect(
        await inspectBuiltPage(
          urlPath,
          (page) => page.evaluate(horizontalOverflow),
          NARROWEST_PHONE,
        ),
      ).toBeLessThanOrEqual(0);
    },
  );
});

describe("Home's latest writing line (#15, #16)", () => {
  it("links the newest post", () => {
    const [newest] = contentsLines();
    const home = mainHtml(readBuiltFile("index.html"));
    const links = elementsWithAttribute(home, "href", newest?.href ?? "");
    expect(links.map(({ text }) => text)).toStrictEqual([newest?.title]);
  });
});
