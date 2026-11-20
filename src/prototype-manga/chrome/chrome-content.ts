// PROTOTYPE — throwaway. Shared data for the header / nav / footer prototypes (#28, #29, #30).
import { identity, positioning } from "../content";

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly chapter: string;
  readonly isContact: boolean;
}

export const navLinks: readonly NavLink[] = [
  { label: "Work", href: "/work", chapter: "01", isContact: false },
  { label: "About", href: "/about", chapter: "02", isContact: false },
  { label: "Blog", href: "/blog", chapter: "03", isContact: false },
  { label: "Contact", href: "/contact", chapter: "04", isContact: true },
];

/** The nav entry a path belongs to; blog posts belong to Blog. */
export const isCurrent = (link: NavLink, current: string): boolean =>
  current === link.href || current.startsWith(`${link.href}/`);

const chapterTitles: Record<string, string> = {
  "/": "Cover",
  "/work": "Case studies",
  "/about": "About the author",
  "/blog": "Writing",
  "/contact": "Next chapter",
};

export const chapterLabel = (current: string): string => {
  const link = navLinks.find((candidate) => isCurrent(candidate, current));
  const title = chapterTitles[link?.href ?? current] ?? "Cover";
  return link ? `Ch. ${link.chapter} · ${title}` : title;
};

export const footer = {
  name: identity.name,
  email: identity.email,
  confession: identity.mangaConfession,
  place: identity.place,
  headline: positioning.headline.join(" "),
  subline: positioning.subline,
  edition: "First edition, November 2026", // draft
  printed: "Printed in Nagasaki, Japan", // draft
  price: "Price: one short conversation, then a clear quote.", // draft
  copyright: `© ${new Date().getFullYear()} Danny Festor`,
  identityLinks: [
    { label: "GitHub", href: "https://github.com/DannyFestor" },
    { label: "LinkedIn", href: "/linkedin-placeholder" }, // placeholder
  ],
  resumes: [
    { label: "Résumé (English, PDF)", href: "/resume-en.pdf" }, // placeholder file
    { label: "職務経歴書 (Japanese, PDF)", href: "/resume-ja.pdf" }, // placeholder file
  ],
} as const;

/** Where the "next chapter" footer panel leads from each page. */
export const nextChapter = (current: string): { label: string; href: string; line: string } =>
  current.startsWith("/contact")
    ? { label: "Back to the cover", href: "/", line: "That was the last chapter. Start again from the cover." } // draft
    : { label: "Contact", href: "/contact", line: "Your project could be the next chapter." }; // draft
