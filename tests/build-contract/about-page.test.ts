import { describe, expect, it } from "vite-plus/test";

import { PHOTO_PLATE } from "../../src/about/about-content.ts";
import { CAREER } from "../../src/career/career-data.ts";
import { SFX_CLASS } from "../../src/lettering/sfx.ts";
import { PROFILE_LINKS, RESUME_LINKS } from "../../src/site-chrome/back-cover-content.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { findBuiltFiles, readBuiltFile } from "./built-site.ts";
import { attributeValue, elementsWithClass, mainHtml, mainText } from "./html-elements.ts";
import { READ_TEXT_IN_MAIN, turnedElements } from "./turned-elements.ts";

const ABOUT_URL_PATH = "/about/";
const html = readBuiltFile("about/index.html");
const main = mainHtml(html);
const inspectBuiltPage = useBuiltSiteBrowser();

/** The coarse halftone mask of Danny's photo, as Astro emits it: /_astro/danny-coarse.<hash>.png. */
const HALFTONE_MASK_URL = /url\((?<path>\/_astro\/danny-coarse\.[\w-]+\.png)\)/u;

const LINK_HREF = /<a\b[^>]*\bhref="(?<href>[^"]*)"/gu;

describe("the About page (#18)", () => {
  it("has its one impact moment: focus lines and ドン", () => {
    expect(elementsWithClass(html, "focus-lines")).toHaveLength(1);
    expect(elementsWithClass(html, SFX_CLASS).map(({ text }) => text)).toStrictEqual(["ドン"]);
  });

  it("draws the photo through the halftone pipeline", () => {
    const [photo] = elementsWithClass(main, "profile-photo");
    expect(photo === undefined ? undefined : attributeValue(photo, "aria-label")).toBe(
      PHOTO_PLATE.alt,
    );
    const maskPath = HALFTONE_MASK_URL.exec(photo?.attributes ?? "")?.groups?.["path"];
    expect(findBuiltFiles("_astro/danny-coarse.*.png").map((file) => `/${file}`)).toContain(
      maskPath,
    );
  });

  it("links both résumés, GitHub and LinkedIn", () => {
    const hrefs = [...main.matchAll(LINK_HREF)].map((match) => match.groups?.["href"]);
    expect(hrefs).toStrictEqual([
      ...RESUME_LINKS.map(({ href }) => href),
      ...PROFILE_LINKS.map(({ href }) => href),
    ]);
  });

  it("tells the profile facts from career.json", () => {
    const text = mainText(html);
    expect(CAREER.languages.filter(({ name }) => !text.includes(name))).toStrictEqual([]);
    expect(text).toContain("Ruhr-Universität Bochum");
    expect(text).toContain("since 2017");
  });

  it("rotates nothing that must be read and sets none of it vertically", async () => {
    expect(
      await inspectBuiltPage(ABOUT_URL_PATH, (page) =>
        page.evaluate(turnedElements, READ_TEXT_IN_MAIN),
      ),
    ).toStrictEqual([]);
  });
});
