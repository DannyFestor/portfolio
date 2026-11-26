import type { RasterSize } from "../../integrations/halftone/halftone-screen.ts";
import type { PixelBox } from "./photo-crop.ts";

/** The page margin around the panels and the gutter between them, in pixels. */
export interface PageSpacing {
  readonly margin: number;
  readonly gutter: number;
}

/** The share image is one manga page of two panels: the photo, then the lettering. */
export interface SharePanels {
  readonly photo: PixelBox;
  readonly lettering: PixelBox;
}

const PANEL_COUNT = 2;
/** A margin or a border on each side. */
const BOTH_SIDES = 2;

/** Two panels side by side on whole pixels; an odd pixel left over goes to the lettering. */
export function sharePanels(canvas: RasterSize, { margin, gutter }: PageSpacing): SharePanels {
  const innerWidth = canvas.width - BOTH_SIDES * margin - gutter;
  const photoWidth = Math.floor(innerWidth / PANEL_COUNT);
  const height = canvas.height - BOTH_SIDES * margin;
  return {
    photo: { left: margin, top: margin, width: photoWidth, height },
    lettering: {
      left: margin + photoWidth + gutter,
      top: margin,
      width: innerWidth - photoWidth,
      height,
    },
  };
}

/** The frame inside a panel's ink border, which the panel's content fills. */
export function insideBorder(panel: PixelBox, borderWidth: number): RasterSize {
  return {
    width: panel.width - BOTH_SIDES * borderWidth,
    height: panel.height - BOTH_SIDES * borderWidth,
  };
}
