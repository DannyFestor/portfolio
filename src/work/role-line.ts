import type { Project } from "../career/career-export.ts";

const SEPARATOR = " · ";

/** `Backend lead · team of 6`, both from career.json. */
export function roleLine({ role, team_size: teamSize }: Project): string {
  return teamSize === null ? role : `${role}${SEPARATOR}team of ${String(teamSize)}`;
}
