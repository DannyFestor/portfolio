/**
 * What the site adds to a project that the career vault does not know (#13): whether Home features
 * it, its Rescue or Build track, its SFX and its impact line. Keyed by the project's vault note
 * name; the entries live in src/data/project-extras.ts and are decided at content time.
 */
import type { ApprovedSfx } from "../lettering/sfx.ts";
import type { Project } from "./career-export.ts";

type ProjectTrack = "rescue" | "build";

export interface ProjectExtras {
  /** Home shows the featured projects. */
  readonly featured?: boolean;
  readonly track?: ProjectTrack;
  /** Only an SFX from the approved list; anything else is a type error. */
  readonly sfx?: ApprovedSfx;
  readonly impactLine?: string;
}

/** Extras by the vault note name of their project. */
export type ProjectExtrasByNote = Readonly<Record<string, ProjectExtras>>;

/** Home shows this many featured projects. */
export const FEATURED_PROJECT_COUNT = 3;

/** The projects the extras feature, in the order given: newest first for Career.projects. */
export function featuredProjects(
  projects: readonly Project[],
  extras: ProjectExtrasByNote,
): Project[] {
  return projects.filter(({ note }) => extras[note]?.featured === true);
}
