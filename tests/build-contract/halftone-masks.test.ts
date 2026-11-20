import { basename } from "node:path";

import sharp from "sharp";
import { describe, expect, it } from "vite-plus/test";

import { MASK_SIZE, planHalftoneMasks } from "../../integrations/halftone/mask-plan.ts";

const plannedMasks = planHalftoneMasks(process.cwd());

describe("halftone masks rendered by the build", () => {
  it("cover both screens of Danny's photo", () => {
    expect(plannedMasks.map((mask) => basename(mask.maskPath))).toStrictEqual([
      "danny-coarse.png",
      "danny-fine.png",
    ]);
  });

  it.each(plannedMasks.map((mask) => [basename(mask.maskPath), mask.maskPath]))(
    "%s is an alpha mask at the mask size",
    async (_, maskPath) => {
      const metadata = await sharp(maskPath).metadata();
      expect(metadata).toMatchObject({ format: "png", ...MASK_SIZE, hasAlpha: true });
    },
  );
});
