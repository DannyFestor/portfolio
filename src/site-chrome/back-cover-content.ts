/**
 * The back cover's copy (#30). Lines marked draft ship as draft and are replaced at content time;
 * the positioning line and subline are locked (#6), the rest is structural.
 */
import { ENGLISH_CV, JAPANESE_SHOKUMU_KEIREKISHO } from "../career/public-resumes.ts";
import {
  CONTACT_EMAIL,
  POSITIONING_LINE,
  POSITIONING_SUBLINE,
  SITE_AUTHOR,
  SITE_PLACE,
} from "../consts.ts";
import { BUILD_YEAR } from "./build-year.ts";

interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

export interface ResumeLink {
  readonly title: string;
  /** Set when the title is not English. */
  readonly titleLanguage?: "ja";
  readonly description: string;
  readonly href: string;
}

export const BLURB = {
  heading: "On the back cover",
  positioningLine: POSITIONING_LINE,
  subline: POSITIONING_SUBLINE,
  // draft
  confession: "I read too much manga. This site is laid out like one.",
} as const;

export const CONTENTS = {
  heading: "In this volume",
  writeTo: "Write to",
  email: CONTACT_EMAIL,
} as const;

export const IMPRINT = {
  // draft
  price: "Price: one short conversation, then a clear quote.",
  colophon: `© ${String(BUILD_YEAR)} ${SITE_AUTHOR} · Printed in ${SITE_PLACE}`,
} as const;

export const PROFILE_LINKS: readonly ExternalLink[] = [
  { label: "GitHub", href: "https://github.com/DannyFestor" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dannyfestor" },
];

export const RESUME_LINKS: readonly ResumeLink[] = [
  { title: "Résumé", description: "English, PDF", href: ENGLISH_CV.urlPath },
  {
    title: "職務経歴書",
    titleLanguage: "ja",
    description: "Japanese, PDF",
    href: JAPANESE_SHOKUMU_KEIREKISHO.urlPath,
  },
];
