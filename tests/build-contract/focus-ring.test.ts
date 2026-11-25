import type { Page } from "playwright";
import { describe, expect, it } from "vite-plus/test";

import {
  readDesignTokens,
  resolvedTokenValue,
  tokenPixels,
} from "../../integrations/design-tokens/design-tokens.ts";
import { parseHexColor } from "../design-tokens/wcag-contrast.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";
import { findBuiltFiles, urlPathOfPage } from "./built-site.ts";

/** An element keyboard focus stopped on, and the outline it showed there. */
interface FocusStop {
  readonly element: string;
  readonly ring: string;
}

/** Ends the tab walk on a page that traps focus. */
const MAX_FOCUS_STOPS = 500;

const tokens = readDesignTokens(process.cwd());
const inspectBuiltPage = useBuiltSiteBrowser();

/** The ring every link and control must show (#27), as the browser computes it. */
function expectedRing(): string {
  const { red, green, blue } = parseHexColor(resolvedTokenValue(tokens, "--focus-ring-color"));
  const width = tokenPixels(tokens, "--focus-ring-width");
  const offset = tokenPixels(tokens, "--focus-ring-offset");
  return `solid ${String(width)}px rgb(${String(red)}, ${String(green)}, ${String(blue)}) offset ${String(offset)}px`;
}

/** Runs in the page: describes the focused element once, then marks it as seen. */
function takeFocusStop(): FocusStop | undefined {
  const element = document.activeElement;
  if (!(element instanceof HTMLElement) || element === document.body) {
    return undefined;
  }
  if (element.dataset["focusStopSeen"] !== undefined) {
    return undefined;
  }
  const style = getComputedStyle(element);
  const stop = {
    element: `<${element.tagName.toLowerCase()}> ${element.textContent.trim()}`,
    ring: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor} offset ${style.outlineOffset}`,
  };
  element.dataset["focusStopSeen"] = "";
  return stop;
}

/** Tabs through the page, as a keyboard user does, until focus leaves it or comes round again. */
async function focusStops(page: Page, stops: readonly FocusStop[] = []): Promise<FocusStop[]> {
  await page.keyboard.press("Tab");
  const stop = await page.evaluate(takeFocusStop);
  if (stop === undefined || stops.length >= MAX_FOCUS_STOPS) {
    return [...stops];
  }
  return focusStops(page, [...stops, stop]);
}

describe("keyboard focus on every built page (#27)", () => {
  it.each(findBuiltFiles("**/*.html").map((page) => urlPathOfPage(page)))(
    "%s shows the focus ring on every link and control",
    async (urlPath) => {
      const stops = await inspectBuiltPage(urlPath, focusStops);
      const ring = expectedRing();
      expect(stops).toStrictEqual(stops.map(({ element }) => ({ element, ring })));
    },
  );
});
