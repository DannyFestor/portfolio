/**
 * What /llms.txt tells language models about Danny (#20). Lines marked draft ship as draft and are
 * replaced at content time. The positioning line (#6) and the status line are locked; the career
 * facts come from career.json, the two worlds from Home, the pages from the chapters and the
 * studies and posts from their collections.
 */
import type { BlogPost } from "../blog/blog-post.ts";
import { CAREER } from "../career/career-data.ts";
import type { SpokenLanguage } from "../career/career-export.ts";
import { AVAILABILITY_STATUS, CONTACT_EMAIL, POSITIONING_LINE, SITE_PLACE } from "../consts.ts";
import { WORLDS } from "../home/home-content.ts";
import { RESUME_LINKS } from "../site-chrome/back-cover-content.ts";
import { CHAPTERS, COVER_HREF } from "../site-chrome/chapters.ts";
import type { Chapter } from "../site-chrome/chapters.ts";
import type { CaseStudy } from "../work/case-study.ts";
import type { LlmsDocument, LlmsLink, LlmsSection } from "./llms-txt.ts";
import { siteUrlOf } from "./site-url.ts";

const HOME_LINK: LlmsLink = {
  title: "Home",
  url: siteUrlOf(COVER_HREF),
  // draft
  description: "Who I am, the two kinds of work I take on, and featured projects.",
};

/** What each chapter's page holds, for a model choosing which page to read. */
const CHAPTER_DESCRIPTIONS: Readonly<Record<string, string>> = {
  // draft
  "/work": "Case studies: the situation, the decisions and the result of each project.",
  // draft
  "/about": "Background, languages, education, résumés and the career so far.",
  // draft
  "/blog": "Technical writing: what broke, what I decided, and why.",
  // draft
  "/contact": "How to start a project, by email.",
};

function chapterDescription({ href }: Chapter): string {
  const description = CHAPTER_DESCRIPTIONS[href];
  if (description === undefined) {
    throw new Error(`The chapter ${href} needs a description in src/seo/llms-content.ts.`);
  }
  return description;
}

function languagesLine(languages: readonly SpokenLanguage[]): string {
  const named = languages.map(({ name, level }) => (level === null ? name : `${name} — ${level}`));
  return `Languages: ${named.join("; ")}.`;
}

function details(): string[] {
  return [
    `${AVAILABILITY_STATUS}.`,
    ...WORLDS.map(({ title, body }) => `${title}: ${body}`),
    languagesLine(CAREER.languages),
    // draft
    `Email: ${CONTACT_EMAIL}`,
  ];
}

function pagesSection(): LlmsSection {
  const chapterLinks = CHAPTERS.map((chapter) => ({
    title: chapter.name,
    url: siteUrlOf(`${chapter.href}/`),
    description: chapterDescription(chapter),
  }));
  return { heading: "Pages", links: [HOME_LINK, ...chapterLinks] };
}

function studiesSection(studies: readonly CaseStudy[]): LlmsSection {
  const links = studies.map(({ project, href, description }) => ({
    title: project.title,
    url: siteUrlOf(href),
    description,
  }));
  return { heading: "Case studies", links };
}

function postsSection(posts: readonly BlogPost[]): LlmsSection {
  const links = posts.map(({ entry, href }) => ({
    title: entry.data.title,
    url: siteUrlOf(href),
    description: entry.data.description,
  }));
  return { heading: "Writing", links };
}

function resumesSection(): LlmsSection {
  const links = RESUME_LINKS.map(({ title, href, description }) => ({
    title,
    url: siteUrlOf(href),
    description,
  }));
  return { heading: "Résumés", links };
}

export function llmsDocument(
  studies: readonly CaseStudy[],
  posts: readonly BlogPost[],
): LlmsDocument {
  return {
    title: CAREER.profile.name,
    // draft: the positioning line is locked, the words around it are not
    summary: `Freelance software engineer in ${SITE_PLACE}. ${POSITIONING_LINE}`,
    details: details(),
    sections: [pagesSection(), studiesSection(studies), postsSection(posts), resumesSection()],
  };
}
