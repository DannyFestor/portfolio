/**
 * The shape of `kariera export --json` (#13), as src/data/career-export.schema.json fixes it:
 * reviewed notes of the career vault, in English. Every key is always present; an absent value is
 * null.
 */

/** A month as `YYYY-MM`. */
export type Month = string;

export interface Profile {
  readonly name: string;
  readonly headline: string;
  readonly summary: readonly string[];
}

/** Whatever has a time span and a vault note: an engagement or a project. */
export interface Period {
  readonly start: Month;
  /** Null while it is still running. */
  readonly end: Month | null;
}

export interface VaultNote {
  /** The vault note's name; the site keys its own data by it. */
  readonly note: string;
}

type EngagementType = "employment" | "dispatch" | "internship" | "freelance" | "own-business";

export interface Engagement extends Period, VaultNote {
  readonly organization: string;
  readonly engagement_type: EngagementType;
  readonly role: string | null;
  readonly summary: readonly string[];
}

export interface Project extends Period, VaultNote {
  /** The `note` of the engagement the project belongs to. */
  readonly engagement: string;
  readonly title: string;
  readonly role: string;
  readonly focus: string | null;
  readonly team_size: number | null;
  readonly industry: string;
  readonly skills: readonly string[];
  readonly description: readonly string[];
  readonly achievements: readonly string[];
}

type QualificationCategory = "degree" | "certificate" | "licence" | "test-result";

export interface Qualification {
  readonly name: string;
  readonly category: QualificationCategory;
  readonly issuer: string | null;
  readonly start: Month | null;
  readonly date: Month;
  readonly level: string | null;
  readonly score: string | null;
}

export interface SpokenLanguage {
  readonly name: string;
  readonly level: string | null;
}

export interface CareerExport {
  readonly schema_version: 1;
  readonly profile: Profile;
  readonly engagements: readonly Engagement[];
  readonly projects: readonly Project[];
  readonly qualifications: readonly Qualification[];
  readonly languages: readonly SpokenLanguage[];
}
