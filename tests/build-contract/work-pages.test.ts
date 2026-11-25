import type { Page } from "playwright";
import { describe, expect, it } from "vite-plus/test";

import { CAREER } from "../../src/career/career-data.ts";
import { SITE_URL } from "../../src/consts.ts";
import { PROJECT_EXTRAS } from "../../src/data/project-extras.ts";
import { SFX_CLASS } from "../../src/lettering/sfx.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import type { Browsing } from "./built-site-browser.ts";
import { findBuiltFiles, readBuiltFile, urlPathOfPage } from "./built-site.ts";
import {
  attributeValue,
  elementsWithAttribute,
  elementsWithClass,
  mainHtml,
} from "./html-elements.ts";
import { READ_TEXT_IN_MAIN, turnedElements } from "./turned-elements.ts";

const WORK_PAGE = "work/index.html";
const STUDY_PAGES = findBuiltFiles("work/*/index.html");
const inspectBuiltPage = useBuiltSiteBrowser();

/** A desktop window shorter than the study, so the study scrolls past the index. */
const SHORT_DESKTOP: Browsing = { viewport: { width: 1280, height: 600 } };

/** The narrowest phone, browsed with JavaScript off. */
const NARROWEST_PHONE: Browsing = {
  viewport: { width: 320, height: 640 },
  javaScriptEnabled: false,
};

const TITLE = /<title>(?<title>[^<]*)<\/title>/u;
const SECTION_LABEL = /<h2\b[^>]*>(?<label>[^<]*)<\/h2>/gu;

interface PageHeadSummary {
  readonly title: string | undefined;
  readonly canonical: string | undefined;
  readonly openGraph: readonly (string | undefined)[];
}

function headOf(page: string): PageHeadSummary {
  const html = readBuiltFile(page);
  const [canonical] = elementsWithAttribute(html, "rel", "canonical");
  const openGraph = ["og:type", "og:title", "og:url"].map((property) => {
    const [meta] = elementsWithAttribute(html, "property", property);
    return meta === undefined ? undefined : attributeValue(meta, "content");
  });
  return {
    title: TITLE.exec(html)?.groups?.["title"],
    canonical: canonical === undefined ? undefined : attributeValue(canonical, "href"),
    openGraph,
  };
}

function studyTitle(page: string): string {
  return elementsWithClass(readBuiltFile(page), "study-title")[0]?.text ?? "";
}

function sfxOfProjectTitled(title: string): string | undefined {
  const project = CAREER.projects.find((candidate) => candidate.title === title);
  return project === undefined ? undefined : PROJECT_EXTRAS[project.note]?.sfx;
}

function currentStudyLinks(page: string): (string | undefined)[] {
  return elementsWithAttribute(readBuiltFile(page), "aria-current", "page")
    .filter((link) => attributeValue(link, "class") === "study-index-link")
    .map((link) => attributeValue(link, "href"));
}

/** Runs in the page: whether the index is still fully in view once the study is scrolled to its end. */
function indexInViewAfterScrolling(): boolean {
  document.querySelector("main article")?.scrollIntoView({ block: "end" });
  const index = document.querySelector("main nav")?.getBoundingClientRect();
  return index !== undefined && index.top >= 0 && index.bottom <= innerHeight && scrollY > 0;
}

/** Runs in the page: the landmarks of the spread, from the top of the page down. */
function spreadOrder(): string[] {
  return [...document.querySelectorAll("main nav, main article")]
    .toSorted(
      (first, second) => first.getBoundingClientRect().top - second.getBoundingClientRect().top,
    )
    .map((element) => element.tagName.toLowerCase());
}

describe("the case study pages (#17)", () => {
  it("include one study at least", () => {
    expect(STUDY_PAGES.length).toBeGreaterThan(0);
  });

  it.each(STUDY_PAGES)("%s has its own title, canonical URL and Open Graph", (page) => {
    const url = new URL(urlPathOfPage(page), SITE_URL).href;
    const title = `${studyTitle(page)} — Danny Festor`;
    expect(headOf(page)).toStrictEqual({
      title,
      canonical: url,
      openGraph: ["article", title, url],
    });
  });

  it("give every study a title of its own", () => {
    const titles = STUDY_PAGES.map((page) => headOf(page).title);
    expect(new Set(titles).size).toBe(STUDY_PAGES.length);
  });

  it.each(STUDY_PAGES)("%s marks its own study as current in the index", (page) => {
    expect(currentStudyLinks(page)).toStrictEqual([urlPathOfPage(page)]);
  });

  it.each(STUDY_PAGES)("%s has one impact moment with its project's SFX", (page) => {
    const html = readBuiltFile(page);
    expect(elementsWithClass(html, "focus-lines")).toHaveLength(1);
    expect(elementsWithClass(html, SFX_CLASS).map(({ text }) => text)).toStrictEqual([
      sfxOfProjectTitled(studyTitle(page)),
    ]);
  });

  it.each(STUDY_PAGES)("%s tells the study as situation, decisions, result", (page) => {
    const labels = [...mainHtml(readBuiltFile(page)).matchAll(SECTION_LABEL)].map(
      (match) => match.groups?.["label"],
    );
    expect(labels).toStrictEqual(["Situation", "Decisions", "Result"]);
  });
});

describe("/work (#17)", () => {
  const newest = STUDY_PAGES.find((page) => headOf(page).canonical === headOf(WORK_PAGE).canonical);

  it("opens the newest study, under that study's head", () => {
    const newestProject = CAREER.projects.find(({ title }) =>
      STUDY_PAGES.some((page) => studyTitle(page) === title),
    );
    expect(newest === undefined ? undefined : studyTitle(newest)).toBe(newestProject?.title);
    expect(studyTitle(WORK_PAGE)).toBe(newestProject?.title);
  });

  it("keeps the index in view while the study scrolls", async () => {
    expect(
      await inspectBuiltPage(
        "/work/",
        (page: Page) => page.evaluate(indexInViewAfterScrolling),
        SHORT_DESKTOP,
      ),
    ).toBe(true);
  });

  it("puts the index first on a phone, then the study", async () => {
    expect(
      await inspectBuiltPage("/work/", (page) => page.evaluate(spreadOrder), NARROWEST_PHONE),
    ).toStrictEqual(["nav", "article"]);
  });

  it("rotates nothing that must be read and sets none of it vertically", async () => {
    expect(
      await inspectBuiltPage("/work/", (page) => page.evaluate(turnedElements, READ_TEXT_IN_MAIN)),
    ).toStrictEqual([]);
  });
});
