/**
 * The site read as one manga volume (#28, #29): the home page is the cover, the four sections are
 * its chapters. The chapter tabs, the running header and the back cover's contents list all read
 * this list.
 */
export interface Chapter {
  /** Two digits, as printed on the tab: 01. */
  readonly number: string;
  /** The tab label. */
  readonly name: string;
  /** The running header's chapter title. */
  readonly title: string;
  readonly href: string;
}

export const CONTACT_CHAPTER: Chapter = {
  number: "04",
  name: "Contact",
  title: "Next chapter",
  href: "/contact",
};

export const CHAPTERS: readonly Chapter[] = [
  { number: "01", name: "Work", title: "Case studies", href: "/work" },
  { number: "02", name: "About", title: "About the author", href: "/about" },
  { number: "03", name: "Blog", title: "Writing", href: "/blog" },
  CONTACT_CHAPTER,
];

export const COVER_HREF = "/";
