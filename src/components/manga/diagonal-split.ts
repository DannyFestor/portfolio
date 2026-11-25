/**
 * Two angled panels side by side, split by a diagonal gutter as wide as the grid gap (#15).
 *
 * Each panel reaches `overhangPercent` of its grid area into the gap, and its inner edge slants by
 * twice that reach, so the gutter keeps the grid gap's width from top to bottom at any width. An
 * overhang of p percent of the area makes the panel (100 + p) percent wide, so the slant is 2p /
 * (100 + p) of the panel's width. Percentage margins of grid items resolve against the grid area,
 * which keeps the ratio the same at every width.
 */
import type { PanelSlant } from "./angled-panel-shape.ts";
import { PANEL_BOX_SIDE } from "./panel-box.ts";

const BOTH_PANELS = 2;

function assertOverhangFits(overhangPercent: number): void {
  if (!(overhangPercent > 0 && overhangPercent < PANEL_BOX_SIDE)) {
    throw new RangeError(
      `A diagonal split's overhang is a percentage above 0 and below 100, not ${String(overhangPercent)}.`,
    );
  }
}

export class DiagonalSplit {
  readonly overhangPercent: number;
  /** The first panel: its right edge slants in at the bottom. */
  readonly before: PanelSlant;
  /** The second panel: its left edge slants in at the top. */
  readonly after: PanelSlant;

  private constructor(overhangPercent: number) {
    this.overhangPercent = overhangPercent;
    const inset =
      (BOTH_PANELS * overhangPercent * PANEL_BOX_SIDE) / (PANEL_BOX_SIDE + overhangPercent);
    this.before = { edge: "right", end: "bottom", inset };
    this.after = { edge: "left", end: "top", inset };
  }

  static withOverhang(overhangPercent: number): DiagonalSplit {
    assertOverhangFits(overhangPercent);
    return new DiagonalSplit(overhangPercent);
  }

  /** Hands the overhang to src/styles/diagonal-split.css. */
  get style(): Record<string, string> {
    return { "--diagonal-split-overhang": `${String(this.overhangPercent)}%` };
  }
}
