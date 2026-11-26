/**
 * The About page's copy (#18): variant A, the character profile page, decided in #37. Lines marked
 * draft ship as draft and are replaced at content time; the structural labels are locked. Career
 * facts come from career.json; the year of the move to Japan is written on the site.
 */
import { CAREER } from "../career/career-data.ts";
import { SITE_AUTHOR } from "../consts.ts";
import { ABOUT_STRUCTURED_DATA } from "../seo/site-structured-data.ts";
import { SITE_PAGE_HEAD } from "../site-chrome/page-head.ts";
import type { PageHead } from "../site-chrome/page-head.ts";
import { careerTimeline } from "./career-timeline.ts";
import { degreeLines, languageLines } from "./profile-facts.ts";
import type { ProfileFact } from "./profile-facts.ts";

/** Living and working in Japan since this year; engagements that ended before it are early chapters. */
const IN_JAPAN_SINCE = 2017;

/** The site's title and description, and the person the page is about (#20). */
export const ABOUT_PAGE_HEAD: PageHead = {
  ...SITE_PAGE_HEAD,
  structuredData: ABOUT_STRUCTURED_DATA,
};

/** The About chapter is two manga pages. */
export const ABOUT_FOLIOS = { profile: 1, story: 2 } as const;

/** The impact panel: the name next to the photo plate. */
export const NAME_PANEL = {
  // draft
  kicker: "Character file · No. 1",
  name: SITE_AUTHOR,
  headline: CAREER.profile.headline,
} as const;

export const PROFILE_FACTS: readonly ProfileFact[] = [
  {
    term: "In Japan",
    // draft
    lines: [{ text: `Living and working here since ${String(IN_JAPAN_SINCE)}`, note: null }],
  },
  { term: "Languages", lines: languageLines(CAREER.languages) },
  { term: "Education", lines: degreeLines(CAREER.qualifications) },
];

export const BIO = {
  heading: "Background",
  // draft: the Profile summary from career.json, until the bio is written at content time
  paragraphs: CAREER.profile.summary,
} as const;

export const RESUME_PANEL = {
  // draft
  heading: "Take it with you",
} as const;

export const CAREER_STRIP = {
  // draft
  heading: "Career so far, read left to right",
  earlyChapterLabel: "Early chapter",
  beats: careerTimeline(CAREER, IN_JAPAN_SINCE),
} as const;
