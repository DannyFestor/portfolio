/**
 * Where in the volume a page sits: the cover, or a chapter (a blog post sits in Blog). The running
 * header and the chapter tabs mark the current page from this.
 */
import { CHAPTERS, COVER_HREF } from "./chapters.ts";
import type { Chapter } from "./chapters.ts";

export type SitePage =
  | { readonly kind: "cover" }
  | { readonly kind: "chapter"; readonly chapter: Chapter };

const COVER_TITLE = "Cover";
const TRAILING_SLASHES = /\/+$/u;

function withoutTrailingSlash(pathname: string): string {
  return pathname.replace(TRAILING_SLASHES, "") || COVER_HREF;
}

function isInChapter(pathname: string, chapter: Chapter): boolean {
  return pathname === chapter.href || pathname.startsWith(`${chapter.href}/`);
}

export function sitePageAt(pathname: string): SitePage {
  const path = withoutTrailingSlash(pathname);
  if (path === COVER_HREF) {
    return { kind: "cover" };
  }
  const chapter = CHAPTERS.find((candidate) => isInChapter(path, candidate));
  if (chapter === undefined) {
    throw new Error(
      `${pathname} is neither the cover nor in a chapter of src/site-chrome/chapters.ts.`,
    );
  }
  return { kind: "chapter", chapter };
}

/** The running header's label: `Ch. 01 · Case studies`, or `Cover` on the home page. */
export function runningChapterLabel(page: SitePage): string {
  return page.kind === "cover" ? COVER_TITLE : `Ch. ${page.chapter.number} · ${page.chapter.title}`;
}

/** `aria-current` for a link to the cover (`undefined`) or to a chapter. */
export function ariaCurrentFor(page: SitePage, chapter?: Chapter): "page" | undefined {
  const isCurrent = page.kind === "cover" ? chapter === undefined : page.chapter === chapter;
  return isCurrent ? "page" : undefined;
}
