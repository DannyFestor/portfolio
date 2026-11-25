/**
 * The About page's profile facts (#18), read from the career export: the spoken languages and the
 * university degrees.
 */
import type { Qualification, SpokenLanguage } from "../career/career-export.ts";
import { yearOf } from "../career/month.ts";

/** One line of a profile fact: the fact, and a smaller note after it. */
export interface FactLine {
  readonly text: string;
  readonly note: string | null;
}

/** A profile fact in a narration box: a label and its lines. */
export interface ProfileFact {
  readonly term: string;
  readonly lines: readonly FactLine[];
}

/** The export gives a start month only to degrees studied over a period: the university ones. */
function isUniversityDegree({ category, start }: Qualification): boolean {
  return category === "degree" && start !== null;
}

function degreeNote({ issuer, date }: Qualification): string {
  const year = String(yearOf(date));
  return issuer === null ? year : `${issuer}, ${year}`;
}

export function languageLines(languages: readonly SpokenLanguage[]): FactLine[] {
  return languages.map(({ name, level }) => ({ text: name, note: level }));
}

export function degreeLines(qualifications: readonly Qualification[]): FactLine[] {
  return qualifications
    .filter((qualification) => isUniversityDegree(qualification))
    .map((degree) => ({ text: degree.name, note: degreeNote(degree) }));
}
