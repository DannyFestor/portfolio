import { brotliDecompressSync } from "node:zlib";

const BYTE_RADIX = 0x1_00;
const UINT16_RADIX = 0x1_00_00;
const INT16_SIGN = 0x80_00;
const UINT16_BYTES = 2;

/** Big-endian reads from binary font data, at byte offsets from its start. */
export interface FontData {
  readonly uint8: (offset: number) => number;
  readonly uint16: (offset: number) => number;
  readonly int16: (offset: number) => number;
  readonly uint32: (offset: number) => number;
  /** The data from `offset` on, so that `offset` reads as 0. */
  readonly from: (offset: number) => FontData;
  /** The `length` bytes at `offset`, brotli-decompressed. */
  readonly brotliDecompressed: (offset: number, length: number) => FontData;
}

function byteReader(bytes: ArrayLike<number>, start: number): (offset: number) => number {
  return (offset) => {
    const byte = bytes[start + offset];
    if (byte === undefined) {
      throw new RangeError(`Font data ends before byte ${String(start + offset)}.`);
    }
    return byte;
  };
}

export function fontData(bytes: ArrayLike<number>, start = 0): FontData {
  const uint8 = byteReader(bytes, start);
  const uint16 = (offset: number): number => uint8(offset) * BYTE_RADIX + uint8(offset + 1);
  return {
    uint8,
    uint16,
    int16: (offset) => ((uint16(offset) + INT16_SIGN) % UINT16_RADIX) - INT16_SIGN,
    uint32: (offset) => uint16(offset) * UINT16_RADIX + uint16(offset + UINT16_BYTES),
    from: (offset) => fontData(bytes, start + offset),
    brotliDecompressed: (offset, length) =>
      fontData(
        brotliDecompressSync(Uint8Array.from({ length }, (_, step) => uint8(offset + step))),
      ),
  };
}
