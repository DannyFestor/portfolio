import { readFileSync } from "node:fs";

import { cmapCodePoints } from "./cmap-code-points.ts";
import { woff2CmapTable } from "./woff2-cmap-table.ts";

/** The Unicode code points a WOFF2 font file has a glyph for. */
export function woff2CodePoints(path: string): ReadonlySet<number> {
  return cmapCodePoints(woff2CmapTable(readFileSync(path)));
}
