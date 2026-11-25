import { describe, expect, it } from "vite-plus/test";

import { CHAPTERS, CONTACT_CHAPTER } from "./chapters.ts";
import { ariaCurrentFor, runningChapterLabel, sitePageAt } from "./site-page.ts";

const [WORK, ABOUT, BLOG] = CHAPTERS;

describe("a page's place in the volume", () => {
  it("is the cover at /", () => {
    expect(sitePageAt("/")).toStrictEqual({ kind: "cover" });
  });

  it.each([
    ["/work", WORK],
    ["/work/", WORK],
    ["/about/", ABOUT],
    ["/blog/signed-urls", BLOG],
    ["/contact/", CONTACT_CHAPTER],
  ])("is a chapter at %s", (pathname, chapter) => {
    expect(sitePageAt(pathname)).toStrictEqual({ kind: "chapter", chapter });
  });

  it("is refused for a path outside every chapter", () => {
    expect(() => sitePageAt("/workshop")).toThrow(/neither the cover nor in a chapter/u);
  });
});

describe("the running header's chapter label", () => {
  it("names the cover on the home page", () => {
    expect(runningChapterLabel(sitePageAt("/"))).toBe("Cover");
  });

  it("numbers and titles a chapter", () => {
    expect(runningChapterLabel(sitePageAt("/work/"))).toBe("Ch. 01 · Case studies");
  });
});

describe("aria-current", () => {
  it("marks the link to the cover on the home page, and no chapter", () => {
    const cover = sitePageAt("/");
    expect([
      ariaCurrentFor(cover),
      ...CHAPTERS.map((chapter) => ariaCurrentFor(cover, chapter)),
    ]).toStrictEqual(["page", undefined, undefined, undefined, undefined]);
  });

  it("marks only the current chapter's tab", () => {
    const post = sitePageAt("/blog/signed-urls");
    expect([
      ariaCurrentFor(post),
      ...CHAPTERS.map((chapter) => ariaCurrentFor(post, chapter)),
    ]).toStrictEqual([undefined, undefined, undefined, "page", undefined]);
  });
});
