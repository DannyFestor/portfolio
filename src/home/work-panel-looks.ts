/**
 * How Home's three work panels are printed (#15), newest project first: each sits in its own area
 * of the page and carries its own screentone, so the three differ in size and weight.
 */
import type { ToneDensity } from "../../integrations/screentone/tone-density.ts";
import type { FadeDirection } from "../components/manga/screentone-fade.ts";

export interface WorkPanelLook {
  /** The class that places the panel: src/styles/home-page.css gives it its area. */
  readonly placement: string;
  /** A flat tone over the whole panel. */
  readonly tone?: ToneDensity;
  /** A gradation tone that fades out across the panel. */
  readonly fade?: { readonly density: ToneDensity; readonly toward: FadeDirection };
}

const WORK_PANEL_LOOKS: readonly WorkPanelLook[] = [
  { placement: "work-panel-tall", tone: "dense" },
  { placement: "work-panel-wide", fade: { density: "deep", toward: "bottom left" } },
  { placement: "work-panel-low", tone: "light" },
];

export function workPanelLook(index: number): WorkPanelLook {
  const look = WORK_PANEL_LOOKS[index];
  if (look === undefined) {
    throw new RangeError(
      `Home prints ${String(WORK_PANEL_LOOKS.length)} work panels, not a panel at index ${String(index)}.`,
    );
  }
  return look;
}
