import type { Project } from "../career/career-export.ts";
/**
 * A case study as the Work pages show it (#17): the hand-written MDX entry joined with its project
 * from career.json and the project's extras. Studies are ordered by their project, newest first,
 * like the career; /work opens the first.
 */
import type { Career } from "../career/career.ts";
import { periodLabel } from "../career/period-label.ts";
import type { ProjectExtras, ProjectExtrasByNote, ProjectTrack } from "../career/project-extras.ts";
import type { ApprovedSfx } from "../lettering/sfx.ts";
import type { CaseStudyFrontmatter } from "./case-study-schema.ts";

/** A collection entry: its id is the MDX file name, the study's slug. */
export interface CaseStudyEntry {
  readonly id: string;
  readonly data: CaseStudyFrontmatter;
}

/** The study page's one impact moment. */
export interface StudyImpact {
  readonly sfx: ApprovedSfx;
  readonly line: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly href: string;
  readonly description: string;
  readonly project: Project;
  readonly period: string;
  readonly track: ProjectTrack | undefined;
  readonly impact: StudyImpact;
}

/** Study pages are directories, as Astro builds them and the sitemap lists them. */
/** What a study reads from the career: its project by note, and the projects' order. */
type CareerProjects = Readonly<Pick<Career, "project" | "projects">>;

const WORK_HREF = "/work";

function studyImpact(note: string, extras: ProjectExtras | undefined): StudyImpact {
  if (extras?.sfx === undefined || extras.impactLine === undefined) {
    throw new Error(
      `The case study of "${note}" needs an sfx and an impactLine in src/data/project-extras.ts.`,
    );
  }
  return { sfx: extras.sfx, line: extras.impactLine };
}

function caseStudy(
  entry: CaseStudyEntry,
  career: CareerProjects,
  extras: ProjectExtrasByNote,
): CaseStudy {
  const project = career.project(entry.data.project);
  const projectExtras = extras[project.note];
  return {
    slug: entry.id,
    href: `${WORK_HREF}/${entry.id}/`,
    description: entry.data.description,
    project,
    period: periodLabel(project),
    track: projectExtras?.track,
    impact: studyImpact(project.note, projectExtras),
  };
}

export function caseStudiesNewestFirst(
  entries: readonly CaseStudyEntry[],
  career: CareerProjects,
  extras: ProjectExtrasByNote,
): CaseStudy[] {
  const careerOrder = (study: CaseStudy): number => career.projects.indexOf(study.project);
  return entries
    .map((entry) => caseStudy(entry, career, extras))
    .toSorted((first, second) => careerOrder(first) - careerOrder(second));
}
