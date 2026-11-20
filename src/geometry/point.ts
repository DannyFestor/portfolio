/** A position in pixels or in viewBox units, depending on the drawing it belongs to. */
export interface Point {
  readonly horizontal: number;
  readonly vertical: number;
}

export function distanceBetween(from: Point, to: Point): number {
  return Math.hypot(to.horizontal - from.horizontal, to.vertical - from.vertical);
}
