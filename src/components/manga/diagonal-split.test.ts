import { describe, expect, it } from "vite-plus/test";

import type { PanelSlant } from "./angled-panel-shape.ts";
import { DiagonalSplit } from "./diagonal-split.ts";

const GRID_GAP = 14;
const PERCENT = 100;
const OVERHANG_PERCENT = 6;

/** Grid area widths of one half of the page: a small tablet, a laptop, the widest page. */
const AREA_WIDTHS_PX = { tablet: 280, laptop: 420, widest: 496 } as const;

interface EdgeAcross {
  readonly top: number;
  readonly bottom: number;
}

/** Where a slanted side edge runs, from the left of the left area, in px. */
function slantedEdge(panelLeft: number, panelWidth: number, slant: PanelSlant): EdgeAcross {
  const side = slant.edge === "right" ? panelLeft + panelWidth : panelLeft;
  const inward = slant.edge === "right" ? -1 : 1;
  const shift = inward * (slant.inset / PERCENT) * panelWidth;
  return slant.end === "top"
    ? { top: side + shift, bottom: side }
    : { top: side, bottom: side + shift };
}

/** The gutter between the two panels, at the top and bottom, for two grid areas `areaWidth` wide. */
function gutterAcross(
  split: Readonly<Pick<DiagonalSplit, "overhangPercent" | "before" | "after">>,
  areaWidth: number,
): EdgeAcross {
  const overhang = (split.overhangPercent / PERCENT) * areaWidth;
  const panelWidth = areaWidth + overhang;
  const before = slantedEdge(0, panelWidth, split.before);
  const after = slantedEdge(areaWidth + GRID_GAP - overhang, panelWidth, split.after);
  return { top: after.top - before.top, bottom: after.bottom - before.bottom };
}

describe("a diagonal split (#15)", () => {
  const split = DiagonalSplit.withOverhang(OVERHANG_PERCENT);

  it.each(Object.values(AREA_WIDTHS_PX))(
    "keeps the gutter as wide as the grid gap, top to bottom, for %ipx wide areas",
    (areaWidth) => {
      const gutter = gutterAcross(split, areaWidth);
      expect(gutter.top).toBeCloseTo(GRID_GAP);
      expect(gutter.bottom).toBeCloseTo(GRID_GAP);
    },
  );

  it("slants the first panel's right edge and the second panel's left edge the same way", () => {
    expect([split.before.edge, split.before.end, split.after.edge, split.after.end]).toStrictEqual([
      "right",
      "bottom",
      "left",
      "top",
    ]);
  });

  it("hands the overhang to the stylesheet as a percentage of the grid area", () => {
    expect(split.style).toStrictEqual({ "--diagonal-split-overhang": "6%" });
  });

  it.each([0, PERCENT])("refuses an overhang of %i%", (overhang) => {
    expect(() => DiagonalSplit.withOverhang(overhang)).toThrow(RangeError);
  });
});
