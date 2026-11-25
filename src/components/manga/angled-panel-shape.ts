import { formatCoordinate } from "../../geometry/format-coordinate.ts";
import type { Point } from "../../geometry/point.ts";
import { PANEL_BOX_SIDE } from "./panel-box.ts";

type HorizontalSide = "left" | "right";
type VerticalSide = "top" | "bottom";
type Side = HorizontalSide | VerticalSide;

/**
 * An angled panel: one edge runs at an angle because one of its ends moves inward. `inset` is how
 * far, in percent of the panel's width (left and right edges) or height (top and bottom edges).
 * Example: `{ edge: "left", end: "bottom", inset: 9 }` slants the left edge, 9% in at the bottom.
 */
export type PanelSlant =
  | { readonly edge: HorizontalSide; readonly end: VerticalSide; readonly inset: number }
  | { readonly edge: VerticalSide; readonly end: HorizontalSide; readonly inset: number };

interface Corner {
  readonly sides: readonly [VerticalSide, HorizontalSide];
  readonly point: Point;
}

/** The panel rectangle, clockwise from the top left, in percent of the panel box. */
const RECTANGLE: readonly Corner[] = [
  { sides: ["top", "left"], point: { horizontal: 0, vertical: 0 } },
  { sides: ["top", "right"], point: { horizontal: PANEL_BOX_SIDE, vertical: 0 } },
  { sides: ["bottom", "right"], point: { horizontal: PANEL_BOX_SIDE, vertical: PANEL_BOX_SIDE } },
  { sides: ["bottom", "left"], point: { horizontal: 0, vertical: PANEL_BOX_SIDE } },
];

/** A unit step from each edge into the panel. */
const INWARD: Readonly<Record<Side, Point>> = {
  top: { horizontal: 0, vertical: 1 },
  right: { horizontal: -1, vertical: 0 },
  bottom: { horizontal: 0, vertical: -1 },
  left: { horizontal: 1, vertical: 0 },
};

function assertInsetFits(inset: number): void {
  if (!(inset > 0 && inset < PANEL_BOX_SIDE)) {
    throw new RangeError(
      `A panel slant inset is a percentage above 0 and below 100, not ${String(inset)}.`,
    );
  }
}

function slantedCorner(corner: Corner, slant: PanelSlant): Point {
  const isSlantedCorner = corner.sides.includes(slant.edge) && corner.sides.includes(slant.end);
  if (!isSlantedCorner) {
    return corner.point;
  }
  const step = INWARD[slant.edge];
  return {
    horizontal: corner.point.horizontal + step.horizontal * slant.inset,
    vertical: corner.point.vertical + step.vertical * slant.inset,
  };
}

/** The outline of an angled panel, as one polygon for both the CSS clip and the SVG ink stroke. */
export class AngledPanelShape {
  /** Corners in percent of the panel box, clockwise from the top left. */
  readonly corners: readonly Point[];

  private constructor(corners: readonly Point[]) {
    this.corners = corners;
  }

  static slanted(slant: PanelSlant): AngledPanelShape {
    assertInsetFits(slant.inset);
    return new AngledPanelShape(RECTANGLE.map((corner) => slantedCorner(corner, slant)));
  }

  /** The CSS `clip-path` value that clips the panel's content. */
  get clipPath(): string {
    const corners = this.corners.map(
      (corner) => `${formatCoordinate(corner.horizontal)}% ${formatCoordinate(corner.vertical)}%`,
    );
    return `polygon(${corners.join(", ")})`;
  }

  /** The SVG `points` of the ink outline, in the panel viewBox (src/components/manga/panel-box.ts). */
  get outlinePoints(): string {
    return this.corners
      .map(
        (corner) => `${formatCoordinate(corner.horizontal)},${formatCoordinate(corner.vertical)}`,
      )
      .join(" ");
  }
}
