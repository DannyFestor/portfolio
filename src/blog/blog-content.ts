/**
 * The Blog pages' copy (#16): the table of contents (目次, variant A) and the printed-volume post
 * (variant B), decided in #39. Lines marked draft ship as draft and are replaced at content time.
 * The approved Japanese and the structural labels are locked. The posts live in src/content/blog.
 */
import { SITE_AUTHOR } from "../consts.ts";
import { BLOG_CHAPTER } from "../site-chrome/chapters.ts";

/** The contents is one manga page; each post is one page of the volume. */
export const BLOG_FOLIOS = { contents: 1, episode: 2 } as const;

export const CONTENTS_TITLE = {
  japanese: "目次",
  label: BLOG_CHAPTER.title,
  heading: "Contents",
  // draft
  aside: "engineering notes, no hot takes",
} as const;

// draft
export const CONTENTS_INTRO =
  "Technical writing: what broke, what I decided, and why. New chapters when there is something worth writing down.";

export const EPISODE = {
  runningHead: `${SITE_AUTHOR} · ${BLOG_CHAPTER.title}`,
  marginNotesLabel: "About this episode",
  // draft
  backLink: "Back to the contents",
  backHref: BLOG_CHAPTER.href,
} as const;

/** The RSS feed of the posts, at /rss.xml. */
export const BLOG_FEED = {
  href: "/rss.xml",
  title: `${SITE_AUTHOR} — ${BLOG_CHAPTER.title}`,
  // draft
  description: `Technical writing by ${SITE_AUTHOR}, freelance software engineer in Japan.`,
} as const;
