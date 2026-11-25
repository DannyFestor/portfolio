import { describe, expect, it } from "vite-plus/test";

import { publishedRates } from "./published-rates.ts";

describe("published rates", () => {
  it.each([
    "¥8,000 a day",
    "€90 per hour",
    "$120/hr",
    "5万円",
    "7000円",
    "800,000 JPY",
    "90 EUR",
    "80k",
    "60/h",
  ])("are found in %s", (text) => {
    expect(publishedRates(`Rates: ${text}.`)).not.toStrictEqual([]);
  });

  it.each([
    "Per project, as a written quote after a short talk.",
    "Within two working days, on JST (UTC+9).",
    "Issue 2026 · Nagasaki, Japan",
    "Chapter 2",
    "© 2026 Danny Festor",
    "04 Contact",
    "Price: one short conversation, then a clear quote.",
  ])("are not confused with %s", (text) => {
    expect(publishedRates(text)).toStrictEqual([]);
  });
});
