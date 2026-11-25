import type { FontData } from "./font-data.ts";

/** The cmap table, https://learn.microsoft.com/typography/opentype/spec/cmap */
const ENCODING_RECORD_COUNT_OFFSET = 2;
const ENCODING_RECORDS_OFFSET = 4;
const ENCODING_RECORD_SIZE = 8;
const SUBTABLE_OFFSET_IN_RECORD = 4;
/** Unicode BMP encodings: Unicode platform, Unicode 2.0 BMP; Windows platform, Unicode BMP. */
const UNICODE_BMP_ENCODINGS = [
  { platform: 0, encoding: 3 },
  { platform: 3, encoding: 1 },
] as const;

/** Format 4, segment mapping to delta values: the Unicode BMP mapping every font here carries. */
const SEGMENT_MAPPING_FORMAT = 4;
const SEGMENT_COUNT_X2_OFFSET = 6;
const END_CODES_OFFSET = 14;
const RESERVED_PAD_BYTES = 2;
const UINT16_BYTES = 2;
const GLYPH_ID_MODULUS = 0x1_00_00;
const MISSING_GLYPH = 0;
/** Positions of the four parallel arrays of a format 4 subtable; a reserved pad follows the first. */
const SEGMENT_ARRAYS = { endCodes: 0, startCodes: 1, idDeltas: 2, idRangeOffsets: 3 } as const;
type SegmentArray = keyof typeof SEGMENT_ARRAYS;

/** The closing segment every format 4 subtable ends with, mapped to the missing glyph. */
const LAST_CODE_POINT = 0xff_ff;

function isUnicodeBmpRecord(cmap: FontData, recordOffset: number): boolean {
  const platform = cmap.uint16(recordOffset);
  const encoding = cmap.uint16(recordOffset + UINT16_BYTES);
  return UNICODE_BMP_ENCODINGS.some(
    (unicode) => unicode.platform === platform && unicode.encoding === encoding,
  );
}

function segmentMappingOffset(cmap: FontData): number {
  const recordOffsets = Array.from(
    { length: cmap.uint16(ENCODING_RECORD_COUNT_OFFSET) },
    (_, index) => ENCODING_RECORDS_OFFSET + index * ENCODING_RECORD_SIZE,
  );
  const subtableOffsets = recordOffsets
    .filter((recordOffset) => isUnicodeBmpRecord(cmap, recordOffset))
    .map((recordOffset) => cmap.uint32(recordOffset + SUBTABLE_OFFSET_IN_RECORD));
  const offset = subtableOffsets.find(
    (subtableOffset) => cmap.uint16(subtableOffset) === SEGMENT_MAPPING_FORMAT,
  );
  if (offset === undefined) {
    throw new Error("The cmap has no format 4 Unicode BMP subtable.");
  }
  return offset;
}

/**
 * One format 4 subtable: parallel arrays of segment end codes, start codes, deltas and range
 * offsets.
 */
class SegmentMapping {
  readonly #cmap: FontData;
  readonly #endCodes: number;
  readonly #segmentCount: number;

  constructor(cmap: FontData, offset: number) {
    this.#cmap = cmap;
    this.#endCodes = offset + END_CODES_OFFSET;
    this.#segmentCount = cmap.uint16(offset + SEGMENT_COUNT_X2_OFFSET) / UINT16_BYTES;
  }

  codePoints(): Set<number> {
    const segments = Array.from({ length: this.#segmentCount }, (_, segment) => segment);
    return new Set(segments.flatMap((segment) => this.#mappedCodePoints(segment)));
  }

  #mappedCodePoints(segment: number): number[] {
    const start = this.#field("startCodes", segment);
    const end = Math.min(this.#field("endCodes", segment), LAST_CODE_POINT - 1);
    const codePoints = Array.from(
      { length: Math.max(end - start + 1, 0) },
      (_, step) => start + step,
    );
    return codePoints.filter((codePoint) => this.#glyphId(segment, codePoint) !== MISSING_GLYPH);
  }

  #glyphId(segment: number, codePoint: number): number {
    const rangeOffset = this.#field("idRangeOffsets", segment);
    const delta = this.#cmap.int16(this.#fieldOffset("idDeltas", segment));
    if (rangeOffset === 0) {
      return (codePoint + delta + GLYPH_ID_MODULUS) % GLYPH_ID_MODULUS;
    }
    const start = this.#field("startCodes", segment);
    const glyph = this.#cmap.uint16(
      this.#fieldOffset("idRangeOffsets", segment) +
        rangeOffset +
        (codePoint - start) * UINT16_BYTES,
    );
    return glyph === MISSING_GLYPH ? glyph : (glyph + delta + GLYPH_ID_MODULUS) % GLYPH_ID_MODULUS;
  }

  #fieldOffset(array: SegmentArray, segment: number): number {
    const position = SEGMENT_ARRAYS[array];
    const pad = position === SEGMENT_ARRAYS.endCodes ? 0 : RESERVED_PAD_BYTES;
    return this.#endCodes + pad + (position * this.#segmentCount + segment) * UINT16_BYTES;
  }

  #field(array: SegmentArray, segment: number): number {
    return this.#cmap.uint16(this.#fieldOffset(array, segment));
  }
}

/** The Unicode code points a cmap table maps to a glyph. */
export function cmapCodePoints(cmap: FontData): ReadonlySet<number> {
  return new SegmentMapping(cmap, segmentMappingOffset(cmap)).codePoints();
}
