import { describe, expect, it } from "vite-plus/test";

import { cropToFrame } from "./photo-crop.ts";

const PORTRAIT_PHOTO = { width: 960, height: 1280 };
/** Half the photo's width, so the window is 960 × 600. */
const LANDSCAPE_FRAME = { width: 480, height: 300 };
const WINDOW_HEIGHT = 600;
/** The window's height would be 960 × 559 / 558 = 961.7: rounded to a whole pixel. */
const ODD_FRAME = { width: 558, height: 559 };
const ODD_WINDOW_HEIGHT = 962;
/** As wide as tall: the 960-pixel square window still fits the photo. */
const SQUARE_FRAME = { width: 500, height: 500 };
const FRAME_TALLER_THAN_THE_PHOTO = { width: 300, height: 500 };

const SUBJECTS = {
  middleHalf: { top: 0.25, bottom: 0.75 },
  topTenth: { top: 0, bottom: 0.1 },
  bottomTenth: { top: 0.9, bottom: 1 },
};

/** The middle half's centre, 640, less half the window, 300. */
const MIDDLE_HALF_WINDOW_TOP = 340;
/** The photo's height, 1280, less the window's height, 600. */
const LOWEST_WINDOW_TOP = 680;

describe("cropping a portrait photo into a wider frame", () => {
  it("keeps the photo's full width in a window of the frame's aspect ratio", () => {
    expect(cropToFrame(PORTRAIT_PHOTO, LANDSCAPE_FRAME, SUBJECTS.middleHalf)).toMatchObject({
      left: 0,
      width: PORTRAIT_PHOTO.width,
      height: WINDOW_HEIGHT,
    });
  });

  it("rounds the window to whole pixels", () => {
    expect(cropToFrame(PORTRAIT_PHOTO, ODD_FRAME, SUBJECTS.middleHalf).height).toBe(
      ODD_WINDOW_HEIGHT,
    );
  });

  it("centres the window on the subject", () => {
    expect(cropToFrame(PORTRAIT_PHOTO, LANDSCAPE_FRAME, SUBJECTS.middleHalf).top).toBe(
      MIDDLE_HALF_WINDOW_TOP,
    );
  });

  it("keeps the window inside the photo when the subject is near an edge", () => {
    expect(cropToFrame(PORTRAIT_PHOTO, LANDSCAPE_FRAME, SUBJECTS.topTenth).top).toBe(0);
    expect(cropToFrame(PORTRAIT_PHOTO, LANDSCAPE_FRAME, SUBJECTS.bottomTenth).top).toBe(
      LOWEST_WINDOW_TOP,
    );
  });

  it("fills a square frame from a portrait photo", () => {
    expect(cropToFrame(PORTRAIT_PHOTO, SQUARE_FRAME, SUBJECTS.middleHalf).height).toBe(
      PORTRAIT_PHOTO.width,
    );
  });

  it("refuses a frame the photo cannot fill without cropping its sides", () => {
    expect(() =>
      cropToFrame(PORTRAIT_PHOTO, FRAME_TALLER_THAN_THE_PHOTO, SUBJECTS.middleHalf),
    ).toThrow(/cannot fill/u);
  });
});
