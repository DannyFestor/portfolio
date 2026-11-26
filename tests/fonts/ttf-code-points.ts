import { readFileSync } from "node:fs";

import { cmapCodePoints } from "./cmap-code-points.ts";
import { fontData } from "./font-data.ts";
import type { FontData } from "./font-data.ts";

/** The table directory of a TrueType font, https://learn.microsoft.com/typography/opentype/spec/otff */
const TABLE_COUNT_OFFSET = 4;
const TABLE_RECORDS_OFFSET = 12;
const TABLE_RECORD_SIZE = 16;
const TABLE_OFFSET_IN_RECORD = 8;
/** "cmap" read as a big-endian uint32. */
const CMAP_TAG = 0x63_6d_61_70;

function cmapTable(ttf: FontData): FontData {
  const recordOffsets = Array.from(
    { length: ttf.uint16(TABLE_COUNT_OFFSET) },
    (_, index) => TABLE_RECORDS_OFFSET + index * TABLE_RECORD_SIZE,
  );
  const cmapRecord = recordOffsets.find((recordOffset) => ttf.uint32(recordOffset) === CMAP_TAG);
  if (cmapRecord === undefined) {
    throw new Error("The font has no cmap table.");
  }
  return ttf.from(ttf.uint32(cmapRecord + TABLE_OFFSET_IN_RECORD));
}

/** The Unicode code points a TrueType font file has a glyph for. */
export function ttfCodePoints(path: string): ReadonlySet<number> {
  return cmapCodePoints(cmapTable(fontData(readFileSync(path))));
}
