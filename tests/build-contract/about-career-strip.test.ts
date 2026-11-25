import { beforeAll, describe, expect, it } from "vite-plus/test";

import {
  readDesignTokens,
  resolvedTokenValue,
} from "../../integrations/design-tokens/design-tokens.ts";
import { CAREER } from "../../src/career/career-data.ts";
import { computedRgb } from "../design-tokens/hex-color.ts";
import { useBuiltSiteBrowser } from "./built-site-browser.ts";

const inspectBuiltPage = useBuiltSiteBrowser();
const tokens = readDesignTokens(process.cwd());

interface BeatOnPage {
  readonly organization: string | undefined;
  readonly stage: string | undefined;
  readonly border: string;
}

/** Runs in the page: each beat of the career strip, its stage and its border colour. */
function beatsOnPage(): BeatOnPage[] {
  return [...document.querySelectorAll<HTMLElement>(".timeline-beat")].map((beat) => ({
    organization: beat.querySelector(".timeline-organization")?.textContent.trim(),
    stage: beat.dataset["stage"],
    border: getComputedStyle(beat).borderTopColor,
  }));
}

function organizationsAt(beats: readonly BeatOnPage[], stage: string): (string | undefined)[] {
  return beats.filter((beat) => beat.stage === stage).map(({ organization }) => organization);
}

describe("the About page's career strip (#18)", () => {
  let beats: readonly BeatOnPage[] = [];

  beforeAll(async () => {
    beats = await inspectBuiltPage("/about/", (page) => page.evaluate(beatsOnPage));
  });

  it("reads oldest first from career.json", () => {
    expect(beats.map(({ organization }) => organization)).toStrictEqual(
      CAREER.engagements.toReversed().map(({ organization }) => organization),
    );
  });

  it("opens with the early chapters before the move to Japan", () => {
    expect(organizationsAt(beats, "early-chapter")).toStrictEqual([
      "Katalyst Labs",
      "Mercedes-Benz R&D Japan",
    ]);
  });

  it("draws the current engagement, and only it, in red", () => {
    const accent = computedRgb(resolvedTokenValue(tokens, "--color-accent"));
    expect(organizationsAt(beats, "current")).toStrictEqual([
      CAREER.currentEngagement?.organization,
    ]);
    expect(beats.filter(({ border }) => border === accent)).toStrictEqual(
      beats.filter(({ stage }) => stage === "current"),
    );
  });
});
