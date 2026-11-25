import { describe, expect, it } from "vite-plus/test";

import {
  attributeValue,
  elementsWithAttribute,
  elementsWithClass,
  isAriaHidden,
} from "./html-elements.ts";

const PAGE = [
  '<main><p class="narration-box">Before touching code, I measured it.</p>',
  '<span aria-hidden="true" class="fuchidori sfx">カチッ</span>',
  '<span class="sfx-free fuchidori">not an SFX</span>',
  '<div class="sfx"> &#x30C9;&#x30F3; </div>',
  '<a href="/work" data-aria-current="page">Work</a><a aria-current="page" href="/blog">Blog</a></main>',
].join("");

describe("elements in built HTML", () => {
  const sfx = elementsWithClass(PAGE, "sfx");

  it("are found by their class, whatever the attribute order", () => {
    expect(sfx.map(({ text }) => text)).toStrictEqual(["カチッ", "ドン"]);
  });

  it("are told apart by aria-hidden", () => {
    expect(sfx.map((element) => isAriaHidden(element))).toStrictEqual([true, false]);
  });

  it("are found by an attribute's exact value, not a longer attribute's", () => {
    const current = elementsWithAttribute(PAGE, "aria-current", "page");
    expect(current.map((element) => attributeValue(element, "href"))).toStrictEqual(["/blog"]);
  });
});
