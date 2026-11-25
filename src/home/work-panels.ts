/**
 * Home's three work panels (#15): the featured projects, newest first. Period, title, client line
 * and beat come from career.json; the impact line comes from the project's extras.
 */
import type { Project } from "../career/career-export.ts";
import type { Career } from "../career/career.ts";
import { periodLabel } from "../career/period-label.ts";
import { featuredProjects } from "../career/project-extras.ts";
import type { ProjectExtrasByNote } from "../career/project-extras.ts";

export interface WorkPanelContent {
  /** The project's vault note name. */
  readonly note: string;
  readonly period: string;
  readonly title: string;
  readonly client: string;
  readonly beat: string;
  readonly impact: string;
}

/** What the work panels read from the career: the projects and the engagement lookup. */
export type CareerProjects = Readonly<Pick<Career, "projects" | "engagement">>;

const LINE_SEPARATOR = " · ";

function clientLine(career: CareerProjects, project: Project): string {
  return [career.engagement(project.engagement).organization, project.industry].join(
    LINE_SEPARATOR,
  );
}

function beatLine({ role, team_size: teamSize }: Project): string {
  return teamSize === null ? role : `${role}, team of ${String(teamSize)}`;
}

function impactLine(project: Project, extras: ProjectExtrasByNote): string {
  const impact = extras[project.note]?.impactLine;
  if (impact === undefined) {
    throw new Error(`The featured project "${project.note}" has no impact line in its extras.`);
  }
  return impact;
}

export function workPanels(
  career: CareerProjects,
  extras: ProjectExtrasByNote,
): WorkPanelContent[] {
  return featuredProjects(career.projects, extras).map((project) => ({
    note: project.note,
    period: periodLabel(project),
    title: project.title,
    client: clientLine(career, project),
    beat: beatLine(project),
    impact: impactLine(project, extras),
  }));
}
