/**
 * The Work pages' copy (#17): variant C, the split spread, decided in #36. Lines marked draft ship
 * as draft and are replaced at content time; the structural labels are locked. The studies
 * themselves live in src/content/case-studies, their facts in career.json and
 * src/data/project-extras.ts.
 */
import type { ProjectTrack } from "../career/project-extras.ts";
import { WORK_CHAPTER } from "../site-chrome/chapters.ts";

/** The spread: the index on the left page, the open study on the right. */
export const WORK_FOLIOS = { index: 1, study: 2 } as const;

export const STUDY_INDEX = {
  heading: WORK_CHAPTER.title,
  // draft
  intro: "Projects I rescued or built, each told from the inside.",
} as const;

export const TRACK_LABELS: Readonly<Record<ProjectTrack, string>> = {
  rescue: "Rescue",
  build: "Build",
};
