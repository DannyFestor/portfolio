/**
 * The decorative barcode on the back cover (#30), drawn as SVG bars and hidden from assistive
 * technology. It is laid out like the EAN-13 on a Japanese book: Japan's ISBN prefix 978-4, then
 * zeros, so it stands for no real book.
 */

/** One character per module, left to right: 1 is ink, 0 is paper. */
export const BARCODE_MODULES =
  "10101110110001001001110100011010001101010011101010111001011100101110010111001011100101110010101";

export interface BarcodeBar {
  /** The module the bar starts at. */
  readonly start: number;
  /** How many modules wide the bar is. */
  readonly width: number;
}

const INK_RUN = /1+/gu;

/** One bar per run of ink modules. */
export function barcodeBars(modules: string): BarcodeBar[] {
  return [...modules.matchAll(INK_RUN)].map((run) => ({ start: run.index, width: run[0].length }));
}
