import { describe, expect, it } from "vite-plus/test";

import type { Point } from "../../geometry/point.ts";
import { BALLOON_TAIL, RULE_COVER, tailFillPath, tailOutlinePath } from "./speech-balloon-tail.ts";

const { rightRoot, outerEdge, innerEdge } = BALLOON_TAIL;
const TIP = outerEdge.end;
const LEFT_ROOT = innerEdge.end;

/** Which side of the line from `from` to `to` the point lies on: the sign of the cross product. */
function sideOf(point: Point, from: Point, to: Point): number {
  return Math.sign(
    (to.horizontal - from.horizontal) * (point.vertical - from.vertical) -
      (to.vertical - from.vertical) * (point.horizontal - from.horizontal),
  );
}

describe("the speech balloon tail", () => {
  it("starts both edges on the balloon's bottom rule", () => {
    expect(rightRoot.vertical).toBe(0);
    expect(LEFT_ROOT.vertical).toBe(0);
  });

  it("ends in a tip below and left of its roots", () => {
    expect(TIP.vertical).toBeGreaterThan(0);
    expect(TIP.horizontal).toBeLessThan(LEFT_ROOT.horizontal);
  });

  it("is curved: both edges bow the same way", () => {
    const outerBow = sideOf(outerEdge.control, rightRoot, TIP);
    const innerBow = sideOf(innerEdge.control, LEFT_ROOT, TIP);
    expect(outerBow).not.toBe(0);
    expect(innerBow).toBe(outerBow);
  });

  it("outlines both edges and leaves the top open, where it joins the balloon", () => {
    expect(tailOutlinePath(BALLOON_TAIL)).toBe("M100 0Q88 70 8 100Q52 62 60 0");
  });

  it("fills over the balloon's rule between its roots", () => {
    expect(tailFillPath(BALLOON_TAIL)).toBe(
      `M60 -${String(RULE_COVER)}L100 -${String(RULE_COVER)}L100 0Q88 70 8 100Q52 62 60 0Z`,
    );
  });
});
