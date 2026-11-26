import { describe, expect, it } from "vite-plus/test";

import { episodeTitle } from "../../src/blog/episode-number.ts";
import { postPageTitle } from "../../src/blog/post-page-head.ts";
import { contentsLines, POST_PAGES } from "./blog-contents.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { readBuiltFile, urlPathOfPage } from "./built-site.ts";
import { elementsWithClass } from "./html-elements.ts";
import { canonicalUrl, metaContent, ownUrlOf, pageTitle } from "./page-head.ts";

const inspectBuiltPage = useBuiltSiteBrowser();

/** The narrowest phone, browsed with JavaScript off. */
const NARROWEST_PHONE = { viewport: { width: 320, height: 640 }, javaScriptEnabled: false };

const CODE_BLOCK = /<pre\b[^>]*>[\s\S]*?<\/pre>/gu;
const COLOR = /color:(?<color>[^;"]+)/gu;
const TOKEN_COLOR = /^var\(--color-[a-z-]+\)$/u;
const READING_TIME = /^\d+ min read$/u;

interface PostHead {
  readonly title: string | undefined;
  readonly canonical: string | undefined;
  readonly type: string | undefined;
}

interface MarginNotesAndText {
  readonly notesLeft: number;
  readonly notesBottom: number;
  readonly textLeft: number;
  readonly textTop: number;
}

function postTitle(page: string): string {
  return elementsWithClass(readBuiltFile(page), "episode-title")[0]?.text ?? "";
}

function headOf(page: string): PostHead {
  const html = readBuiltFile(page);
  return {
    title: pageTitle(html),
    canonical: canonicalUrl(html),
    type: metaContent(html, "property", "og:type"),
  };
}

function codeBlockColors(page: string): string[] {
  const blocks = Array.from(readBuiltFile(page).matchAll(CODE_BLOCK), ([block]) => block);
  const colors = blocks.flatMap((block) =>
    Array.from(block.matchAll(COLOR), (match) => match.groups?.["color"] ?? ""),
  );
  return [...new Set(colors)];
}

/** Runs in the page: where the margin notes and the text sit. */
function marginNotesAndText(): MarginNotesAndText {
  const notes = (
    document.querySelector(".episode-margin-notes") ?? document.body
  ).getBoundingClientRect();
  const text = (document.querySelector(".episode-text") ?? document.body).getBoundingClientRect();
  return {
    notesLeft: notes.left,
    notesBottom: notes.bottom,
    textLeft: text.left,
    textTop: text.top,
  };
}

describe("the post pages (#16)", () => {
  it("include one post at least", () => {
    expect(POST_PAGES.length).toBeGreaterThan(0);
  });

  it.each(POST_PAGES)("%s has its own title, canonical URL and Open Graph type", (page) => {
    expect(headOf(page)).toStrictEqual({
      title: postPageTitle(postTitle(page)),
      canonical: ownUrlOf(page),
      type: "article",
    });
  });

  it.each(POST_PAGES)("%s carries the episode number of its contents line", (page) => {
    const line = contentsLines().find(({ href }) => href === urlPathOfPage(page));
    expect(elementsWithClass(readBuiltFile(page), "episode-number")[0]?.text).toBe(
      episodeTitle(Number(line?.number)),
    );
  });

  it.each(POST_PAGES)("%s shows its reading time", (page) => {
    const [readingTime] = elementsWithClass(readBuiltFile(page), "episode-reading-time");
    expect(readingTime?.text).toMatch(READING_TIME);
  });

  it.each(POST_PAGES)("%s colours its code from the design tokens only", (page) => {
    expect(codeBlockColors(page).filter((color) => !TOKEN_COLOR.test(color))).toStrictEqual([]);
  });
});

describe("a post's margin notes (#16)", () => {
  const urlPath = urlPathOfPage(POST_PAGES[0] ?? "");

  it("sit beside the text on a desktop", async () => {
    const boxes = await inspectBuiltPage(urlPath, (page) => page.evaluate(marginNotesAndText));
    expect(boxes.notesLeft).toBeLessThan(boxes.textLeft);
  });

  it("move above the text on a phone", async () => {
    const boxes = await inspectBuiltPage(
      urlPath,
      (page) => page.evaluate(marginNotesAndText),
      NARROWEST_PHONE,
    );
    expect(boxes.notesBottom).toBeLessThanOrEqual(boxes.textTop);
  });
});
