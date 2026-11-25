/**
 * The period style decided in #25: `2025 — now`, `2024 — 25`, `2018 — 20`. The end year is
 * shortened to two digits only within the start's century; a period still running ends in "now".
 */
import type { Month, Period } from "./career-export.ts";

const PERIOD_SEPARATOR = " — ";
const RUNNING_PERIOD_END = "now";
const YEARS_PER_CENTURY = 100;
const SHORT_YEAR_DIGITS = 2;

function yearOf(month: Month): number {
  return Number(month.slice(0, month.indexOf("-")));
}

function centuryOf(year: number): number {
  return Math.floor(year / YEARS_PER_CENTURY);
}

function endYearLabel(startYear: number, endYear: number): string {
  if (centuryOf(startYear) !== centuryOf(endYear)) {
    return String(endYear);
  }
  return String(endYear % YEARS_PER_CENTURY).padStart(SHORT_YEAR_DIGITS, "0");
}

export function periodLabel({ start, end }: Period): string {
  const startYear = yearOf(start);
  const endLabel = end === null ? RUNNING_PERIOD_END : endYearLabel(startYear, yearOf(end));
  return `${String(startYear)}${PERIOD_SEPARATOR}${endLabel}`;
}
