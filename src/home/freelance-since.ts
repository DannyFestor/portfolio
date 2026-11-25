/** The year Danny went freelance (#15): the start of the first freelance or own-business engagement. */
import type { Engagement } from "../career/career-export.ts";
import { yearOf } from "../career/month.ts";

const FREELANCE_ENGAGEMENT_TYPES: ReadonlySet<Engagement["engagement_type"]> = new Set([
  "freelance",
  "own-business",
]);

export function freelanceSince(engagements: readonly Engagement[]): number {
  const years = engagements
    .filter(({ engagement_type }) => FREELANCE_ENGAGEMENT_TYPES.has(engagement_type))
    .map(({ start }) => yearOf(start));
  if (years.length === 0) {
    throw new Error("career.json has no freelance or own-business engagement.");
  }
  return Math.min(...years);
}
