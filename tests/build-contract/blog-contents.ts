import { findBuiltFiles, readBuiltFile, urlPathOfPage } from "./built-site.ts";
import { attributeValue, elementsWithClass } from "./html-elements.ts";

/** The built post pages, as files: blog/<slug>/index.html. */
export const POST_PAGES = findBuiltFiles("blog/*/index.html");

/** The built post pages, as URL paths: /blog/<slug>/. */
export const POST_URL_PATHS = POST_PAGES.map((page) => urlPathOfPage(page));

export const contentsHtml = readBuiltFile("blog/index.html");

/** One line of the built table of contents. */
export interface ContentsLine {
  readonly number: string;
  readonly href: string;
  readonly title: string;
}

/** The lines of the table of contents, top to bottom. */
export function contentsLines(): ContentsLine[] {
  const numbers = elementsWithClass(contentsHtml, "contents-number");
  return elementsWithClass(contentsHtml, "contents-title").map((link, index) => ({
    number: numbers[index]?.text ?? "",
    href: attributeValue(link, "href") ?? "",
    title: link.text,
  }));
}

export function alphabetically(texts: readonly string[]): string[] {
  return texts.toSorted((first, second) => first.localeCompare(second));
}
