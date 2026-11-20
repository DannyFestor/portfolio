import sharp from "sharp";
import { describe, expect, it } from "vite-plus/test";

import { distanceBetween } from "../../src/geometry/point.ts";
import type { Point } from "../../src/geometry/point.ts";
import { TEST_SETTINGS } from "./test-support/test-settings.ts";
import { TONE_DENSITIES } from "./tone-density.ts";
import { svgDataUrl, toneTileDots, toneTileSide, toneTileSvg } from "./tone-tile.ts";

const PRECISION_DIGITS = 12;

/** Coordinates in the SVG markup are rounded to three decimals. */
const MARKUP_DIGITS = 3;

const SIDE = toneTileSide(TEST_SETTINGS.pitch);
const HALF = 0.5;
const CENTRE: Point = { horizontal: SIDE * HALF, vertical: SIDE * HALF };
const CORNERS: readonly Point[] = [
  { horizontal: 0, vertical: 0 },
  { horizontal: SIDE, vertical: 0 },
  { horizontal: SIDE, vertical: SIDE },
  { horizontal: 0, vertical: SIDE },
];

const DATA_URL = /^url\("data:image\/svg\+xml,(?<payload>[^"\s]+)"\)$/u;
const CIRCLE =
  /<circle cx='(?<horizontal>[\d.]+)' cy='(?<vertical>[\d.]+)' r='(?<radius>[\d.]+)'\/>/gu;

function circlesIn(svg: string): { centre: Point; radius: number }[] {
  return [...svg.matchAll(CIRCLE)].map(({ groups }) => ({
    centre: { horizontal: Number(groups?.["horizontal"]), vertical: Number(groups?.["vertical"]) },
    radius: Number(groups?.["radius"]),
  }));
}

function payloadOf(url: string): string {
  return decodeURIComponent(DATA_URL.exec(url)?.groups?.["payload"] ?? "");
}

describe("tone tile lattice", () => {
  it("is a square of one pitch times √2", () => {
    expect(SIDE).toBeCloseTo(TEST_SETTINGS.pitch * Math.SQRT2, PRECISION_DIGITS);
  });

  it("has a dot at each corner and one at the centre", () => {
    expect(toneTileDots(TEST_SETTINGS.pitch)).toStrictEqual([...CORNERS, CENTRE]);
  });

  it.each(CORNERS.map((corner, index) => [index, corner]))(
    "puts corner %i one pitch from the centre, on a 45° diagonal",
    (_, corner) => {
      expect(distanceBetween(CENTRE, corner)).toBeCloseTo(TEST_SETTINGS.pitch, PRECISION_DIGITS);
      expect(Math.abs(corner.horizontal - CENTRE.horizontal)).toBeCloseTo(
        Math.abs(corner.vertical - CENTRE.vertical),
        PRECISION_DIGITS,
      );
    },
  );
});

describe.each(TONE_DENSITIES)("the %s tone tile", (density) => {
  const svg = toneTileSvg(TEST_SETTINGS, density);

  it("draws the lattice dots at the density's radius", () => {
    const circles = circlesIn(svg);
    expect(circles).toHaveLength(toneTileDots(TEST_SETTINGS.pitch).length);
    toneTileDots(TEST_SETTINGS.pitch).forEach((dot, index) => {
      expect(circles[index]?.centre.horizontal).toBeCloseTo(dot.horizontal, MARKUP_DIGITS);
      expect(circles[index]?.centre.vertical).toBeCloseTo(dot.vertical, MARKUP_DIGITS);
      expect(circles[index]?.radius).toBe(TEST_SETTINGS.dotRadius[density]);
    });
  });

  it("paints the dots in the tone color and opacity", () => {
    expect(svg).toContain(
      `<g fill='${TEST_SETTINGS.color}' fill-opacity='${String(TEST_SETTINGS.opacity)}'>`,
    );
  });

  it("is an SVG image of the tile's size", async () => {
    const metadata = await sharp(Buffer.from(svg)).metadata();
    expect(metadata.format).toBe("svg");
    expect(metadata.width).toBe(Math.round(SIDE));
  });

  it("encodes into a CSS data URL that decodes back to the same SVG", () => {
    expect(payloadOf(svgDataUrl(svg))).toBe(svg);
  });
});
