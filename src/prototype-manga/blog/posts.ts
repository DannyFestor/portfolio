// PROTOTYPE — throwaway. Blog data for the Blog page prototypes (#7 page layouts).
// Two real posts from portfolio_old, plus clearly marked placeholder entries for realistic listing length.
import * as signedUrls from "./laravel-signed-urls-are-underrated.md";
import * as soketi from "./laravel-soketi.md";

export interface PostEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly tags: readonly string[];
  readonly placeholder: boolean;
  readonly minutes: number;
}

interface Frontmatter {
  title: string;
  description: string;
  pubDate: string;
  tags?: string[];
}

const WORDS_PER_MINUTE = 220;

const fromMarkdown = (slug: string, md: { frontmatter: Frontmatter; rawContent: () => string }): PostEntry => ({
  slug,
  title: md.frontmatter.title,
  description: md.frontmatter.description,
  date: md.frontmatter.pubDate,
  tags: md.frontmatter.tags ?? [],
  placeholder: false,
  minutes: Math.max(1, Math.round(md.rawContent().split(/\s+/).length / WORDS_PER_MINUTE)),
});

const placeholder = (slug: string, title: string, description: string, date: string, tags: string[]): PostEntry => ({
  slug,
  title,
  description,
  date,
  tags,
  placeholder: true,
  minutes: 8,
});

// Placeholder titles only show listing length; they are not planned posts.
export const posts: readonly PostEntry[] = [
  placeholder(
    "placeholder-ai-review",
    "[Placeholder] Reviewing an AI-written pull request like a senior engineer",
    "Placeholder entry for listing length.",
    "2026-10-02",
    ["AI", "Code review"],
  ),
  placeholder(
    "placeholder-postgres-versioning",
    "[Placeholder] Asset versioning on PostgreSQL without a history table explosion",
    "Placeholder entry for listing length.",
    "2026-07-15",
    ["Go", "PostgreSQL"],
  ),
  placeholder(
    "placeholder-explain-analyze",
    "[Placeholder] One index, seconds to milliseconds: reading EXPLAIN ANALYZE",
    "Placeholder entry for listing length.",
    "2025-05-20",
    ["PostgreSQL", "Performance"],
  ),
  fromMarkdown("sample-post", signedUrls),
  fromMarkdown("laravel-soketi", soketi),
  placeholder(
    "placeholder-livewire",
    "[Placeholder] Livewire admin areas that survive their second year",
    "Placeholder entry for listing length.",
    "2023-11-08",
    ["Laravel", "Livewire"],
  ),
];

export const featuredPost = signedUrls;
export const featuredEntry = posts.find((post) => post.slug === "sample-post");

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const chapterNumber = (index: number): string => String(posts.length - index).padStart(2, "0");
