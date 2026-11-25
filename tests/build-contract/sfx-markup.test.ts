import { describe, expect, it } from "vite-plus/test";

import { isAriaHidden, sfxElementsIn } from "./sfx-markup.ts";

const PAGE = [
  '<main><p class="narration-box">Before touching code, I measured it.</p>',
  '<span aria-hidden="true" class="fuchidori sfx">カチッ</span>',
  '<span class="sfx-free fuchidori">not an SFX</span>',
  '<div class="sfx"> &#x30C9;&#x30F3; </div></main>',
].join("");

describe("SFX in built HTML", () => {
  const elements = sfxElementsIn(PAGE);

  it("are found by their class, whatever the attribute order", () => {
    expect(elements.map(({ text }) => text)).toStrictEqual(["カチッ", "ドン"]);
  });

  it("are told apart by aria-hidden", () => {
    expect(elements.map((element) => isAriaHidden(element))).toStrictEqual([true, false]);
  });
});
