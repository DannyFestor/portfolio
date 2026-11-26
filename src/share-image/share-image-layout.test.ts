import { describe, expect, it } from "vite-plus/test";

import { insideBorder, sharePanels } from "./share-image-layout.ts";

const CANVAS = { width: 1200, height: 630 };
const SPACING = { margin: 28, gutter: 14 };
const ODD_CANVAS = { width: 1201, height: 630 };
const BORDER = 3;
/** A border on each side. */
const BOTH_SIDES = 2;

/** (1200 − 2 × 28 − 14) / 2 */
const PANEL_WIDTH = 565;
/** 630 − 2 × 28 */
const PANEL_HEIGHT = 574;
/** 28 + 565 + 14 */
const LETTERING_LEFT = 607;

describe("the share image's two panels", () => {
  it("puts the photo panel in the left half, inside the page margin", () => {
    expect(sharePanels(CANVAS, SPACING).photo).toStrictEqual({
      left: SPACING.margin,
      top: SPACING.margin,
      width: PANEL_WIDTH,
      height: PANEL_HEIGHT,
    });
  });

  it("puts the lettering panel in the right half, a gutter away from the photo", () => {
    expect(sharePanels(CANVAS, SPACING).lettering).toStrictEqual({
      left: LETTERING_LEFT,
      top: SPACING.margin,
      width: PANEL_WIDTH,
      height: PANEL_HEIGHT,
    });
  });

  it("keeps both panels on whole pixels, giving a spare pixel to the lettering", () => {
    const { photo, lettering } = sharePanels(ODD_CANVAS, SPACING);
    expect(photo.width).toBe(PANEL_WIDTH);
    expect(lettering.width).toBe(PANEL_WIDTH + 1);
    expect(lettering.left + lettering.width).toBe(ODD_CANVAS.width - SPACING.margin);
  });
});

describe("the frame inside a panel's border", () => {
  it("is the panel less a border on each side", () => {
    expect(
      insideBorder({ left: 0, top: 0, width: PANEL_WIDTH, height: PANEL_HEIGHT }, BORDER),
    ).toStrictEqual({
      width: PANEL_WIDTH - BOTH_SIDES * BORDER,
      height: PANEL_HEIGHT - BOTH_SIDES * BORDER,
    });
  });
});
