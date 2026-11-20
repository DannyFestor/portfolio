/** A position in pixels, in either image space or screen space. */
export interface Point {
  readonly horizontal: number;
  readonly vertical: number;
}

/**
 * The rotation that turns image space into screen space, where the dot lattice is axis-aligned and
 * every cell is a `pitch` × `pitch` square.
 */
export interface ScreenRotation {
  readonly cos: number;
  readonly sin: number;
}

/** A cell's centre sits half a pitch past the cell's lower corner. */
const CELL_CENTRE_OFFSET = 0.5;

export function screenRotation(angleRadians: number): ScreenRotation {
  return { cos: Math.cos(angleRadians), sin: Math.sin(angleRadians) };
}

export function toScreenSpace(imagePoint: Point, rotation: ScreenRotation): Point {
  return {
    horizontal: imagePoint.horizontal * rotation.cos + imagePoint.vertical * rotation.sin,
    vertical: -imagePoint.horizontal * rotation.sin + imagePoint.vertical * rotation.cos,
  };
}

export function toImageSpace(screenPoint: Point, rotation: ScreenRotation): Point {
  return {
    horizontal: screenPoint.horizontal * rotation.cos - screenPoint.vertical * rotation.sin,
    vertical: screenPoint.horizontal * rotation.sin + screenPoint.vertical * rotation.cos,
  };
}

function cellCentreOnAxis(coordinate: number, pitch: number): number {
  return (Math.floor(coordinate / pitch) + CELL_CENTRE_OFFSET) * pitch;
}

/** The centre, in screen space, of the lattice cell that holds `screenPoint`. */
export function cellCentre(screenPoint: Point, pitch: number): Point {
  return {
    horizontal: cellCentreOnAxis(screenPoint.horizontal, pitch),
    vertical: cellCentreOnAxis(screenPoint.vertical, pitch),
  };
}

export function distanceBetween(from: Point, to: Point): number {
  return Math.hypot(to.horizontal - from.horizontal, to.vertical - from.vertical);
}
