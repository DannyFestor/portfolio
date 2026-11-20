import { darknessOf, dotRadius, inkCoverage } from "./dot-shape.ts";
import {
  cellCentre,
  distanceBetween,
  screenRotation,
  toImageSpace,
  toScreenSpace,
} from "./screen-geometry.ts";
import type { Point, ScreenRotation } from "./screen-geometry.ts";

/** The classic angle for a single-ink screen: the eye notices dot rows least along the diagonal. */
const SCREEN_ANGLE_DEGREES = 45;
const DEGREES_PER_HALF_TURN = 180;
const SCREEN_ANGLE_RADIANS = (SCREEN_ANGLE_DEGREES / DEGREES_PER_HALF_TURN) * Math.PI;

export interface RasterSize {
  readonly width: number;
  readonly height: number;
}

/** A grayscale image whose luminance runs from 0 (black) to 1 (white). */
export interface GrayRaster {
  readonly size: RasterSize;
  /** Luminance of the pixel under `point`; points outside the image read the nearest edge pixel. */
  readonly luminanceAt: (point: Point) => number;
}

/** An amplitude-modulated dot screen; `pitch` is the distance between dot centres in pixels. */
export interface HalftoneScreen {
  readonly name: string;
  readonly pitch: number;
}

interface ScreenLattice {
  readonly rotation: ScreenRotation;
  readonly pitch: number;
}

/**
 * Each pixel belongs to one lattice cell. The cell's dot is sized by the luminance under its
 * centre, and the pixel is inked as far as the dot reaches it.
 */
function inkAt(pixel: Point, raster: GrayRaster, lattice: ScreenLattice): number {
  const screenPoint = toScreenSpace(pixel, lattice.rotation);
  const centre = cellCentre(screenPoint, lattice.pitch);
  const darkness = darknessOf(raster.luminanceAt(toImageSpace(centre, lattice.rotation)));
  return inkCoverage(dotRadius(darkness, lattice.pitch), distanceBetween(screenPoint, centre));
}

/** Ink coverage, from 0 (paper) to 1 (ink), of every pixel in row-major order. */
export function screenRaster(raster: GrayRaster, screen: HalftoneScreen): Float32Array {
  const { width, height } = raster.size;
  const lattice: ScreenLattice = {
    rotation: screenRotation(SCREEN_ANGLE_RADIANS),
    pitch: screen.pitch,
  };
  const coverage = new Float32Array(width * height);
  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      coverage[row * width + column] = inkAt(
        { horizontal: column, vertical: row },
        raster,
        lattice,
      );
    }
  }
  return coverage;
}
