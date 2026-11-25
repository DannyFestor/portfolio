import { formatPathPoint } from "../../geometry/format-coordinate.ts";
import type { Point } from "../../geometry/point.ts";

/**
 * The tail is drawn in a square 100 × 100 viewBox hung below the balloon. Vertical 0 is the centre
 * line of the balloon's bottom rule, where both tail edges start; the tip points down and left.
 */
export const BALLOON_TAIL_VIEW_BOX = "0 0 100 100";

/** A quadratic Bézier curve from the previous point to `end`, pulled toward `control`. */
interface QuadraticSegment {
  readonly control: Point;
  readonly end: Point;
}

/**
 * The curved tail: two edges that bow the same way, from the right root to the tip to the left
 * root.
 */
export interface BalloonTail {
  readonly rightRoot: Point;
  readonly outerEdge: QuadraticSegment;
  readonly innerEdge: QuadraticSegment;
}

/**
 * How far the tail's paper reaches up into the balloon, in viewBox units: well past the half of the
 * balloon's rule that lies inside it, so the rule between the roots is hidden.
 */
export const RULE_COVER = 15;

const TIP: Point = { horizontal: 8, vertical: 100 };

export const BALLOON_TAIL: BalloonTail = {
  rightRoot: { horizontal: 100, vertical: 0 },
  outerEdge: { control: { horizontal: 88, vertical: 70 }, end: TIP },
  innerEdge: { control: { horizontal: 52, vertical: 62 }, end: { horizontal: 60, vertical: 0 } },
};

function segmentPath({ control, end }: QuadraticSegment): string {
  return `Q${formatPathPoint(control)} ${formatPathPoint(end)}`;
}

function edgesPath(tail: BalloonTail): string {
  return `${segmentPath(tail.outerEdge)}${segmentPath(tail.innerEdge)}`;
}

/** The ink outline: both edges, open at the top where the tail joins the balloon. */
export function tailOutlinePath(tail: BalloonTail): string {
  return `M${formatPathPoint(tail.rightRoot)}${edgesPath(tail)}`;
}

/** The paper fill: the tail, closed over the balloon's rule between the roots. */
export function tailFillPath(tail: BalloonTail): string {
  const leftRoot = tail.innerEdge.end;
  const coverLeft = { horizontal: leftRoot.horizontal, vertical: -RULE_COVER };
  const coverRight = { horizontal: tail.rightRoot.horizontal, vertical: -RULE_COVER };
  return `M${formatPathPoint(coverLeft)}L${formatPathPoint(coverRight)}L${formatPathPoint(tail.rightRoot)}${edgesPath(tail)}Z`;
}
