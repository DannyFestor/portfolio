import type { AstroComponentFactory } from "astro/runtime/server/index.js";
/**
 * The case studies from the `caseStudies` collection (src/content.config.ts), ready for the Work
 * pages.
 */
import { getCollection, getEntry, render } from "astro:content";

import { CAREER } from "../career/career-data.ts";
import { PROJECT_EXTRAS } from "../data/project-extras.ts";
import { caseStudiesNewestFirst } from "./case-study.ts";
import type { CaseStudy } from "./case-study.ts";

export async function caseStudies(): Promise<CaseStudy[]> {
  return caseStudiesNewestFirst(await getCollection("caseStudies"), CAREER, PROJECT_EXTRAS);
}

/** The /work/<slug> routes, one per study. */
export async function caseStudyPaths(): Promise<
  { params: { slug: string }; props: { study: CaseStudy } }[]
> {
  return (await caseStudies()).map((study) => ({ params: { slug: study.slug }, props: { study } }));
}

/** The study /work opens: the newest. */
export async function newestCaseStudy(): Promise<CaseStudy> {
  const [newest] = await caseStudies();
  if (newest === undefined) {
    throw new Error("/work opens the newest case study, but src/content/case-studies has none.");
  }
  return newest;
}

/** The study's MDX body, rendered. */
export async function caseStudyContent({ slug }: CaseStudy): Promise<AstroComponentFactory> {
  const entry = await getEntry("caseStudies", slug);
  if (entry === undefined) {
    throw new Error(`src/content/case-studies has no study named "${slug}".`);
  }
  return (await render(entry)).Content;
}
