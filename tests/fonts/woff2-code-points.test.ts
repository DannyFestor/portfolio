import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { fontFileUrl, ZEN_ANTIQUE, ZEN_ANTIQUE_REGULAR } from "../../src/fonts/font-subsets.ts";
import { woff2CmapTable } from "./woff2-cmap-table.ts";
import { woff2CodePoints } from "./woff2-code-points.ts";

const zenAntique = woff2CodePoints(join("public", fontFileUrl(ZEN_ANTIQUE, ZEN_ANTIQUE_REGULAR)));

function codePointOf(character: string): number {
  return character.codePointAt(0) ?? 0;
}

describe("WOFF2 code points", () => {
  it("include the Latin letters of a subset", () => {
    expect(Array.from("AZaz09").every((character) => zenAntique.has(codePointOf(character)))).toBe(
      true,
    );
  });

  it("include the Japanese the subset keeps", () => {
    expect(zenAntique.has(codePointOf("カ"))).toBe(true);
  });

  it("leave out what the subset dropped", () => {
    expect(zenAntique.has(codePointOf("猫"))).toBe(false);
  });

  it("refuse a file that is not WOFF2", () => {
    expect(() => woff2CmapTable(Buffer.from("not a font"))).toThrow("Not a WOFF2 file");
  });
});
