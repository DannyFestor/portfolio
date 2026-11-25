import { describe, expect, it } from "vite-plus/test";

import { otherLanguageFound } from "./language-text.ts";

describe("Japanese text", () => {
  it.each([
    "開発を担当しました。",
    "Built the shop: 開発を担当",
    "Built the shop (開発を担当しました、テストも書きました).",
  ])("is found in %s", (text) => {
    expect(otherLanguageFound(text)).toStrictEqual(["Japanese text"]);
  });

  it.each([
    "the certification of specialists (専門医・認定医) of a society",
    "the branches (校舎) of the schools",
    "the export file of Kodomon (コドモン)",
  ])("passes as a short gloss in %s", (text) => {
    expect(otherLanguageFound(text)).toStrictEqual([]);
  });
});

describe("German text", () => {
  it.each([
    "Entwicklung eines Shops für Spielzeug, der mit Laravel gebaut wurde.",
    "Pflege und Erweiterung der Anwendung, die von Schulen genutzt wird",
  ])("is found in %s", (text) => {
    expect(otherLanguageFound(text)).toStrictEqual(["German text"]);
  });

  it.each([
    "Berufskolleg für Technik und Gestaltung",
    "Ruhr-Universität Bochum",
    "under the trade name Brücke",
    "Released under the MIT licence, as Die Hard fans do",
  ])("passes as a proper name or English in %s", (text) => {
    expect(otherLanguageFound(text)).toStrictEqual([]);
  });
});
