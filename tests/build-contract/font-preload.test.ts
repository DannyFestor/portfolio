import { describe, expect, it } from "vite-plus/test";

import { PRELOADED_FONT_URL } from "../../src/fonts/font-subsets.ts";
import { builtPages, builtStylesheets, isBuiltUrlPath } from "./built-site.ts";
import { attributeValue, elementsWithAttribute, hasAttribute } from "./html-elements.ts";
import type { HtmlElement } from "./html-elements.ts";

/** An @font-face rule: its family, then the URL of its file. */
const FONT_FACE =
  /@font-face\s*\{[^}]*font-family:\s*["']?(?<family>[^;"'}]+)["']?;[^}]*url\(\s*["']?(?<url>[^"')\s]+)/gu;

/** The family of every @font-face the site ships, keyed by the URL of its file. */
function fontFamiliesByUrl(): Map<string, string> {
  return new Map(
    Array.from(builtStylesheets().matchAll(FONT_FACE), (match) => [
      match.groups?.["url"] ?? "",
      match.groups?.["family"] ?? "",
    ]),
  );
}

function preloadOf(link: HtmlElement): Record<string, string | boolean | undefined> {
  return {
    href: attributeValue(link, "href"),
    as: attributeValue(link, "as"),
    type: attributeValue(link, "type"),
    crossorigin: hasAttribute(link, "crossorigin"),
  };
}

describe("the heading font preload (#21)", () => {
  it("fetches the file the Zen Antique heading face loads", () => {
    expect(isBuiltUrlPath(PRELOADED_FONT_URL)).toBe(true);
    expect(fontFamiliesByUrl().get(PRELOADED_FONT_URL)).toBe("Zen Antique");
  });

  it.each(builtPages())(
    "$urlPath preloads that woff2 as a CORS font, and nothing else",
    ({ html }) => {
      expect(
        elementsWithAttribute(html, "rel", "preload").map((link) => preloadOf(link)),
      ).toStrictEqual([
        { href: PRELOADED_FONT_URL, as: "font", type: "font/woff2", crossorigin: true },
      ]);
    },
  );
});
