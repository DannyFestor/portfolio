import { describe, expect, it } from "vite-plus/test";

import { CAREER } from "../../src/career/career-data.ts";
import { featuredProjects } from "../../src/career/project-extras.ts";
import { AVAILABILITY_STATUS, CONTACT_EMAIL, POSITIONING_LINE } from "../../src/consts.ts";
import { PROJECT_EXTRAS } from "../../src/data/project-extras.ts";
import { SFX_CLASS } from "../../src/lettering/sfx.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { readBuiltFile } from "./built-site.ts";
import { attributeValue, elementsWithClass, mainText } from "./html-elements.ts";
import { READ_TEXT_IN_MAIN, turnedElements } from "./turned-elements.ts";

const HOME_URL_PATH = "/";
const html = readBuiltFile("index.html");
const inspectBuiltPage = useBuiltSiteBrowser();

/** The narrowest phone the site is laid out for (#15). */
const NARROW_PHONE = { viewport: { width: 320, height: 640 }, javaScriptEnabled: false } as const;

interface PanelBox {
  readonly left: number;
  readonly top: number;
  readonly bottom: number;
  readonly width: number;
}

/** Runs in the page: the boxes of the panels in <main> that are shown, in DOM order. */
function shownPanelBoxes(): PanelBox[] {
  return [...document.querySelectorAll("main .panel")]
    .map((panel) => panel.getBoundingClientRect())
    .filter((box) => box.width > 0)
    .map(({ left, top, bottom, width }) => ({ left, top, bottom, width }));
}

/** Runs in the page: how far the page is wider than the viewport. */
function horizontalOverflow(): number {
  return document.documentElement.scrollWidth - innerWidth;
}

function isInColumnOf(box: PanelBox, first: PanelBox): boolean {
  return box.left === first.left && box.width === first.width;
}

function isBelow(box: PanelBox, previous: PanelBox | undefined): boolean {
  return previous === undefined || box.top >= previous.bottom;
}

function isStackedInOneColumn(boxes: readonly PanelBox[]): boolean {
  const [first] = boxes;
  return (
    first !== undefined &&
    boxes.every((box, index) => isInColumnOf(box, first) && isBelow(box, boxes[index - 1]))
  );
}

describe("the Home page (#15)", () => {
  it("is headed by the positioning line, the SFX hidden from its name", async () => {
    const headingNames = await inspectBuiltPage(HOME_URL_PATH, async (page) => {
      const heading = page.getByRole("heading", { level: 1 });
      return (await heading.ariaSnapshot()).split("\n");
    });
    expect(headingNames).toStrictEqual([`- heading "${POSITIONING_LINE}" [level=1]`]);
  });

  it("has its one impact moment: focus lines and カチッ", () => {
    expect(elementsWithClass(html, "focus-lines")).toHaveLength(1);
    expect(elementsWithClass(html, SFX_CLASS).map(({ text }) => text)).toStrictEqual(["カチッ"]);
  });

  it("tells the featured projects from career.json, newest first", () => {
    const titles = featuredProjects(CAREER.projects, PROJECT_EXTRAS).map(({ title }) => title);
    expect(elementsWithClass(html, "work-title").map(({ text }) => text)).toStrictEqual(titles);
  });

  it("offers the email as its call to action, next to the status line", () => {
    const hrefs = elementsWithClass(html, "call-to-action").map((link) =>
      attributeValue(link, "href"),
    );
    expect(hrefs).toStrictEqual([`mailto:${CONTACT_EMAIL}`]);
    expect(mainText(html)).toContain(AVAILABILITY_STATUS);
  });

  it("collapses to one column of panels in reading order on a phone", async () => {
    const boxes = await inspectBuiltPage(
      HOME_URL_PATH,
      (page) => page.evaluate(shownPanelBoxes),
      NARROW_PHONE,
    );
    expect(isStackedInOneColumn(boxes)).toBe(true);
  });

  it("fits a 320px phone without scrolling sideways", async () => {
    expect(
      await inspectBuiltPage(
        HOME_URL_PATH,
        (page) => page.evaluate(horizontalOverflow),
        NARROW_PHONE,
      ),
    ).toBeLessThanOrEqual(0);
  });

  it("rotates nothing that must be read and sets none of it vertically", async () => {
    expect(
      await inspectBuiltPage(HOME_URL_PATH, (page) =>
        page.evaluate(turnedElements, READ_TEXT_IN_MAIN),
      ),
    ).toStrictEqual([]);
  });
});
