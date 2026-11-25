/**
 * The Contact page's copy (#19): variant B, the next-chapter preview (次回予告), decided in #38. Lines
 * marked draft ship as draft and are replaced at content time. The chapter title, the approved
 * Japanese and the structural labels are locked. The status line and the email come from
 * src/consts.ts.
 */
import { CONTACT_CHAPTER } from "../site-chrome/chapters.ts";

/** One numbered preview frame: what happens after the first email. */
export interface PreviewFrameContent {
  readonly number: number;
  readonly label: string;
  readonly text: string;
}

/** One line of the facts list. `japanese` follows the description, marked up as Japanese. */
export interface ContactFact {
  readonly term: string;
  readonly description: string;
  readonly japanese?: string;
}

/** The Contact chapter is one manga page. */
export const CONTACT_FOLIO = 1;

/** The label strip: 次回予告 (next-chapter preview), set horizontally. */
export const NEXT_CHAPTER_STRIP = {
  japanese: "次回予告",
  english: CONTACT_CHAPTER.title,
} as const;

/** The impact panel. */
export const CHAPTER_TITLE = {
  chapter: "Chapter 2",
  title: "Your project.",
} as const;

export const PREVIEW_FRAMES: readonly PreviewFrameContent[] = [
  // draft
  {
    number: 1,
    label: "First",
    text: "You write: the situation, the deadline, what is already built.",
  },
  // draft
  {
    number: 2,
    label: "Then",
    text: "A short call or a few emails. I ask until I understand the problem.",
  },
  // draft
  {
    number: 3,
    label: "After",
    text: "A clear per-project quote, in writing. No hourly surprises.",
  },
];

export const EMAIL_PANEL = {
  // draft
  heading: "Starts the moment you write",
  // draft
  aside: "a plain email, no form",
} as const;

export const CONTACT_FACTS: readonly ContactFact[] = [
  // draft: rates stay private, framed as a quote
  { term: "Rates", description: "Per project, as a written quote after a short talk." },
  // draft
  { term: "Replies", description: "Within two working days, on JST (UTC+9)." },
  { term: "Languages", description: "English, German or Japanese.", japanese: "日本語OK." },
];
