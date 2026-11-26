import type { RasterSize } from "../../integrations/halftone/halftone-screen.ts";

const HALF = 0.5;

/** A band across the photo, in shares of its height: 0 is the top edge, 1 the bottom edge. */
export interface VerticalSpan {
  readonly top: number;
  readonly bottom: number;
}

/** A rectangle of whole pixels: its top left corner and its size. */
export interface PixelBox extends RasterSize {
  readonly left: number;
  readonly top: number;
}

function clamp(value: number, lowest: number, highest: number): number {
  return Math.min(highest, Math.max(lowest, value));
}

/**
 * The part of the photo that fills `frame`: the photo's full width, cut to the frame's aspect ratio
 * from the top and bottom only, as close to centred on `subject` as the photo's edges allow.
 */
export function cropToFrame(photo: RasterSize, frame: RasterSize, subject: VerticalSpan): PixelBox {
  const height = Math.round((photo.width * frame.height) / frame.width);
  const spareHeight = photo.height - height;
  if (spareHeight < 0) {
    throw new Error("The photo cannot fill a frame this tall without cropping its sides.");
  }
  const subjectCentre = (subject.top + subject.bottom) * HALF * photo.height;
  const top = clamp(Math.round(subjectCentre - height * HALF), 0, spareHeight);
  return { left: 0, top, width: photo.width, height };
}
