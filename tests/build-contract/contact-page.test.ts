import type { Page } from "playwright";
import { describe, expect, it } from "vite-plus/test";

import { CONTACT_EMAIL } from "../../src/consts.ts";
import { SFX_CLASS } from "../../src/lettering/sfx.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import type { Browsing } from "./built-site-browser.ts";
import { readBuiltFile } from "./built-site.ts";
import { attributeValue, elementsWithClass, mainText } from "./html-elements.ts";
import { publishedRates } from "./published-rates.ts";
import { READ_TEXT_IN_MAIN, turnedElements } from "./turned-elements.ts";

const CONTACT_URL_PATH = "/contact/";
const html = readBuiltFile("contact/index.html");
const inspectBuiltPage = useBuiltSiteBrowser();

/** A common phone, browsed with JavaScript off (#19). */
const PHONE: Browsing = { viewport: { width: 390, height: 844 }, javaScriptEnabled: false };

interface EmailOnScreen {
  readonly text: string;
  readonly inFirstViewport: boolean;
}

/** Runs in the page: the email call to action, and whether it lies fully in the first viewport. */
function emailOnScreen(): EmailOnScreen | undefined {
  const link = document.querySelector("main .call-to-action");
  if (link === null) {
    return undefined;
  }
  const box = link.getBoundingClientRect();
  const inFirstViewport =
    box.top >= 0 && box.left >= 0 && box.bottom <= innerHeight && box.right <= innerWidth;
  return { text: link.textContent.trim(), inFirstViewport };
}

describe("the Contact page (#19)", () => {
  it("offers the email as its call to action", () => {
    const hrefs = elementsWithClass(html, "call-to-action").map((link) =>
      attributeValue(link, "href"),
    );
    expect(hrefs).toStrictEqual([`mailto:${CONTACT_EMAIL}`]);
  });

  it("publishes no rates", () => {
    expect(publishedRates(mainText(html))).toStrictEqual([]);
  });

  it("has its one impact moment: focus lines and ゴゴゴ", () => {
    expect(elementsWithClass(html, "focus-lines")).toHaveLength(1);
    expect(elementsWithClass(html, SFX_CLASS).map(({ text }) => text)).toStrictEqual(["ゴゴゴ"]);
  });

  it("shows the email without scrolling on a phone", async () => {
    const email = await inspectBuiltPage(
      CONTACT_URL_PATH,
      (page: Page) => page.evaluate(emailOnScreen),
      PHONE,
    );
    expect(email).toStrictEqual({ text: CONTACT_EMAIL, inFirstViewport: true });
  });

  it("rotates nothing that must be read and sets none of it vertically", async () => {
    expect(
      await inspectBuiltPage(CONTACT_URL_PATH, (page) =>
        page.evaluate(turnedElements, READ_TEXT_IN_MAIN),
      ),
    ).toStrictEqual([]);
  });
});
