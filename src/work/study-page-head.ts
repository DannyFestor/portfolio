import { SITE_AUTHOR } from "../consts.ts";
import type { PageHead } from "../site-chrome/page-head.ts";
import type { CaseStudy } from "./case-study.ts";

/** A study's own title, canonical URL and link preview; /work, showing the newest study, shares it. */
export function studyPageHead({ project, description, href }: CaseStudy): PageHead {
  return {
    title: `${project.title} — ${SITE_AUTHOR}`,
    description,
    canonicalPath: href,
    openGraphType: "article",
  };
}
