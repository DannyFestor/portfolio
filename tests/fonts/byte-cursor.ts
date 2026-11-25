import type { FontData } from "./font-data.ts";

const BASE_128_DIGIT_BITS = 0x7f;
const BASE_128_CONTINUES = 0x80;
const BASE_128_RADIX = 128;
const BASE_128_MAX_BYTES = 5;

/** Reads numbers from font data, front to back. */
export class ByteCursor {
  readonly #data: FontData;
  #position: number;

  constructor(data: FontData, position: number) {
    this.#data = data;
    this.#position = position;
  }

  get position(): number {
    return this.#position;
  }

  skip(byteCount: number): void {
    this.#position += byteCount;
  }

  uint8(): number {
    const value = this.#data.uint8(this.#position);
    this.skip(Uint8Array.BYTES_PER_ELEMENT);
    return value;
  }

  /** WOFF2's UIntBase128: seven bits per byte, the high bit set on every byte but the last. */
  uintBase128(): number {
    let value = 0;
    for (let index = 0; index < BASE_128_MAX_BYTES; index += 1) {
      const byte = this.uint8();
      value = value * BASE_128_RADIX + (byte & BASE_128_DIGIT_BITS);
      if ((byte & BASE_128_CONTINUES) === 0) {
        return value;
      }
    }
    throw new Error("A UIntBase128 number runs past five bytes.");
  }
}
