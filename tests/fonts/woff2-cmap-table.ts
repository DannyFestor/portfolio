import { ByteCursor } from "./byte-cursor.ts";
import { fontData } from "./font-data.ts";
import type { FontData } from "./font-data.ts";

/** WOFF2 file format, https://www.w3.org/TR/WOFF2/ */
const SIGNATURE = 0x77_4f_46_32;
const COLLECTION_FLAVOR = 0x74_74_63_66;
const FLAVOR_OFFSET = 4;
const TABLE_COUNT_OFFSET = 12;
const COMPRESSED_SIZE_OFFSET = 20;
const HEADER_SIZE = 48;

const TAG_INDEX_BITS = 0x3f;
const TRANSFORM_VERSION_SHIFT = 6;
const ARBITRARY_TAG_INDEX = 63;
const TAG_BYTES = 4;
const CMAP_TAG_INDEX = 0;
/** Glyf and loca count transform version 3 as untransformed; every other table counts version 0. */
const GLYF_TAG_INDEX = 10;
const LOCA_TAG_INDEX = 11;
const GLYF_AND_LOCA_TAG_INDICES: ReadonlySet<number> = new Set([GLYF_TAG_INDEX, LOCA_TAG_INDEX]);
const GLYF_AND_LOCA_NULL_TRANSFORM = 3;
const NULL_TRANSFORM = 0;

interface TableEntry {
  readonly tagIndex: number;
  /** Bytes the table takes in the decompressed table data. */
  readonly storedLength: number;
}

function isTransformed(tagIndex: number, transformVersion: number): boolean {
  return GLYF_AND_LOCA_TAG_INDICES.has(tagIndex)
    ? transformVersion !== GLYF_AND_LOCA_NULL_TRANSFORM
    : transformVersion !== NULL_TRANSFORM;
}

function readTableEntry(cursor: Readonly<ByteCursor>): TableEntry {
  const flags = cursor.uint8();
  const tagIndex = flags & TAG_INDEX_BITS;
  if (tagIndex === ARBITRARY_TAG_INDEX) {
    cursor.skip(TAG_BYTES);
  }
  const originalLength = cursor.uintBase128();
  const transformed = isTransformed(tagIndex, flags >> TRANSFORM_VERSION_SHIFT);
  return { tagIndex, storedLength: transformed ? cursor.uintBase128() : originalLength };
}

function assertSingleFontWoff2(woff2: FontData): void {
  if (woff2.uint32(0) !== SIGNATURE) {
    throw new Error("Not a WOFF2 file.");
  }
  if (woff2.uint32(FLAVOR_OFFSET) === COLLECTION_FLAVOR) {
    throw new Error("WOFF2 font collections are not supported.");
  }
}

function cmapOffset(entries: readonly TableEntry[]): number {
  const cmapIndex = entries.findIndex((entry) => entry.tagIndex === CMAP_TAG_INDEX);
  if (cmapIndex === -1) {
    throw new Error("The font has no cmap table.");
  }
  return entries.slice(0, cmapIndex).reduce((offset, entry) => offset + entry.storedLength, 0);
}

/** The font's cmap table, decompressed. WOFF2 never transforms cmap, so it reads as in a TTF. */
export function woff2CmapTable(bytes: ArrayLike<number>): FontData {
  const woff2 = fontData(bytes);
  assertSingleFontWoff2(woff2);
  const cursor = new ByteCursor(woff2, HEADER_SIZE);
  const entries = Array.from({ length: woff2.uint16(TABLE_COUNT_OFFSET) }, () =>
    readTableEntry(cursor),
  );
  const tables = woff2.brotliDecompressed(cursor.position, woff2.uint32(COMPRESSED_SIZE_OFFSET));
  return tables.from(cmapOffset(entries));
}
