/**
 * Panel drawings (angled outlines, focus lines) use a 100 × 100 viewBox stretched over the panel,
 * so one unit is one percent of the panel's width or height, the same units as a CSS `polygon()`.
 */
export const PANEL_BOX_SIDE = 100;

const HALF = 0.5;

/** The centre of the panel box, on either axis. */
export const PANEL_BOX_MIDDLE = PANEL_BOX_SIDE * HALF;

export const PANEL_VIEW_BOX = `0 0 ${String(PANEL_BOX_SIDE)} ${String(PANEL_BOX_SIDE)}`;
