import type { Page } from "playwright";
import { describe, expect, it } from "vite-plus/test";

import {
  readDesignTokens,
  resolvedTokenValue,
  tokenPixels,
} from "../../integrations/design-tokens/design-tokens.ts";
import { CONTACT_CHAPTER } from "../../src/site-chrome/chapters.ts";
import { computedRgb } from "../design-tokens/hex-color.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import type { Browsing } from "./built-site-browser.ts";
import { findBuiltFiles, urlPathOfPage } from "./built-site.ts";

/** The narrowest phone the chrome must work on, browsed with JavaScript off (#29). */
const NARROWEST_PHONE: Browsing = {
  viewport: { width: 320, height: 640 },
  javaScriptEnabled: false,
};

const tokens = readDesignTokens(process.cwd());
const inspectBuiltPage = useBuiltSiteBrowser();
const urlPaths = findBuiltFiles("**/*.html").map((page) => urlPathOfPage(page));

/** Runs in the page: the bottom edge of the tab linking to `href`, as `4px rgb(207, 51, 42)`. */
function tabEdge(href: string): string {
  const tab = document.querySelector(`.chapter-tab[href="${href}"]`);
  if (tab === null) {
    return `no tab links to ${href}`;
  }
  const style = getComputedStyle(tab);
  return `${style.borderBottomWidth} ${style.borderBottomColor}`;
}

/** Runs in the page: the tabs that do not lie fully inside the viewport. */
function tabsOutsideViewport(): string[] {
  return [...document.querySelectorAll(".chapter-tab")]
    .filter((tab) => {
      const box = tab.getBoundingClientRect();
      return box.width === 0 || box.left < 0 || box.right > document.documentElement.clientWidth;
    })
    .map((tab) => tab.textContent.trim());
}

/** Runs in the page: header and footer elements that are rotated or set vertically. */
function turnedChromeElements(): string[] {
  return [...document.querySelectorAll("header, header *, footer, footer *")]
    .filter((element) => {
      const style = getComputedStyle(element);
      return (
        style.transform !== "none" ||
        style.rotate !== "none" ||
        style.writingMode !== "horizontal-tb"
      );
    })
    .map((element) => element.tagName.toLowerCase());
}

function scrollsSideways(page: Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
}

describe("the chapter tabs (#29)", () => {
  it.each(urlPaths)("%s draws Contact's tab with a red edge", async (urlPath) => {
    const accent = computedRgb(resolvedTokenValue(tokens, "--color-accent"));
    const edge = `${String(tokenPixels(tokens, "--line-tab-edge"))}px ${accent}`;
    expect(
      await inspectBuiltPage(urlPath, (page) => page.evaluate(tabEdge, CONTACT_CHAPTER.href)),
    ).toBe(edge);
  });

  it.each(urlPaths)("%s shows every tab at 320px wide with JavaScript off", async (urlPath) => {
    const outside = await inspectBuiltPage(
      urlPath,
      (page) => page.evaluate(tabsOutsideViewport),
      NARROWEST_PHONE,
    );
    expect(outside).toStrictEqual([]);
  });

  it.each(urlPaths)("%s does not scroll sideways at 320px wide", async (urlPath) => {
    expect(await inspectBuiltPage(urlPath, scrollsSideways, NARROWEST_PHONE)).toBe(false);
  });
});

describe("the running header and back cover (#28, #30)", () => {
  it.each(urlPaths)("%s rotates nothing and sets nothing vertically", async (urlPath) => {
    expect(
      await inspectBuiltPage(urlPath, (page) => page.evaluate(turnedChromeElements)),
    ).toStrictEqual([]);
  });
});
