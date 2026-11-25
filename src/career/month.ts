import type { Month } from "./career-export.ts";

/** The year a `YYYY-MM` month falls in. */
export function yearOf(month: Month): number {
  return Number(month.slice(0, month.indexOf("-")));
}
