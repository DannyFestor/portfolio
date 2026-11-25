/**
 * Contracted hours stay private (#13), like rates: finds an amount, or a range of amounts, of hours
 * (160h, 140–180 hours, 月160時間).
 */
const WORKING_HOURS =
  /\d[\d,.]*(?:\s?[-–~〜]\s?\d[\d,.]*)?\s?(?:h|hrs?|hours?|時間)(?![\p{L}\d])/giu;

/** The amounts of hours in the text; empty when it publishes none. */
export function workingHoursFound(text: string): string[] {
  return [...text.matchAll(WORKING_HOURS)].map(([hours]) => hours);
}
