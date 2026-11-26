/**
 * The Home page's copy (#15): variant A, the seinen page grid, decided in #35. Lines marked draft
 * ship as draft and are replaced at content time. The positioning line and subline (#6), the two
 * worlds' titles, the status line and the structural labels are locked. Career facts and the work
 * panels come from career.json and the project extras.
 */
import { CAREER } from "../career/career-data.ts";
import { SITE_AUTHOR, SITE_PLACE } from "../consts.ts";
import { PROJECT_EXTRAS } from "../data/project-extras.ts";
import { HOME_STRUCTURED_DATA } from "../seo/site-structured-data.ts";
import { SITE_PAGE_HEAD } from "../site-chrome/page-head.ts";
import type { PageHead } from "../site-chrome/page-head.ts";
import { freelanceSince } from "./freelance-since.ts";
import { workPanels } from "./work-panels.ts";

/** One of the two worlds Danny works in, split by the diagonal gutter. */
export interface WorldContent {
  readonly title: string;
  readonly body: string;
  readonly aside: string;
}

/** The site's title and description, and who the site is by (#20). */
export const HOME_PAGE_HEAD: PageHead = { ...SITE_PAGE_HEAD, structuredData: HOME_STRUCTURED_DATA };

/** Home is three manga pages: the opening, the two worlds and the work, then contact and writing. */
export const HOME_FOLIOS = { opening: 1, work: 2, contact: 3 } as const;

export const ESTABLISHING_PANEL = {
  place: SITE_PLACE,
  // draft
  introduction: `${SITE_AUTHOR}. Freelance full-stack engineer.`,
  // draft
  aside: `freelance since ${String(freelanceSince(CAREER.engagements))} — still here`,
} as const;

export const PORTRAIT_PANEL = {
  // draft
  aside: "that's me, holding a camera, not a keyboard, for once",
} as const;

export const WORLDS: readonly [WorldContent, WorldContent] = [
  {
    title: "AI-era rescue",
    // draft
    body: "Your codebase grew fast with AI help and now nobody trusts it. I read it, find what is actually broken, and make it safe to change again.",
    // draft
    aside: "the door most clients come in through",
  },
  {
    title: "Greenfield build",
    // draft
    body: "A new system from requirements to production, built by hand or with AI, reviewed and tested like it will run for ten years.",
    // draft
    aside: "where the good projects end up",
  },
];

export const WORK_PANELS = workPanels(CAREER, PROJECT_EXTRAS);

export const CONTACT_PANEL = {
  // draft
  heading: "Write to me.",
} as const;

export const LATEST_WRITING = {
  label: "Latest writing",
} as const;
