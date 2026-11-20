import { toneClass } from "../../../integrations/screentone/tone-density.ts";
import type { ToneDensity } from "../../../integrations/screentone/tone-density.ts";
import type { AngledPanelShape } from "./angled-panel-shape.ts";

/** The classes of a panel: angled or square, flat tone or plain paper. */
export function panelClasses(
  shape: AngledPanelShape | undefined,
  tone: ToneDensity | undefined,
): string[] {
  const shapeClasses = shape === undefined ? [] : ["angled-panel"];
  const toneClasses = tone === undefined ? [] : ["screentone", toneClass(tone)];
  return ["panel", ...shapeClasses, ...toneClasses];
}

/** Hands the angled outline to the clip in src/styles/page-composition.css. */
export function panelClipStyle(
  shape: AngledPanelShape | undefined,
): Record<string, string> | undefined {
  return shape === undefined ? undefined : { "--panel-clip": shape.clipPath };
}
