/**
 * Where a screentone fade runs to: the tone is full on the opposite side and fades out toward this
 * one.
 */
export type FadeDirection =
  | "top"
  | "top right"
  | "right"
  | "bottom right"
  | "bottom"
  | "bottom left"
  | "left"
  | "top left";

/** Sets the fade's gradient direction; src/styles/screentone.css reads it. */
export function fadeDirectionStyle(toward: FadeDirection): Record<string, string> {
  return { "--screentone-fade-toward": `to ${toward}` };
}
