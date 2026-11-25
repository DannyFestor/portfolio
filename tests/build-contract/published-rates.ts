/**
 * Rates stay private (#19): the site frames them as a quote and never prints an amount. Finds
 * digits written as a price or a rate: a currency before or after an amount, thousands (80k), or an
 * amount per unit of time.
 */

const CURRENCY_SYMBOL = "[$€£¥￥円]";

const PRICE_PATTERNS: readonly Readonly<RegExp>[] = [
  new RegExp(`${CURRENCY_SYMBOL}\\s?\\d[\\d,.]*`, "gu"),
  new RegExp(
    `\\d[\\d,.]*\\s?(?:${CURRENCY_SYMBOL}|万|k\\b|(?:usd|eur|jpy|yen|euros?|dollars?)\\b)`,
    "giu",
  ),
  /\d[\d,.]*\s?(?:\/|per\s|an?\s)\s?(?:h|hr|hour|day|week|month|year)s?\b/giu,
];

/** The amounts in the text that read as a price or a rate; empty when it publishes none. */
export function publishedRates(text: string): string[] {
  return PRICE_PATTERNS.flatMap((pattern) => [...text.matchAll(pattern)].map(([amount]) => amount));
}
