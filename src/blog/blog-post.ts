/**
 * A blog post as the Blog pages show it (#16): the collection entry with its link, its episode
 * number and its reading time. The listing shows the posts newest first; the episodes (第N話) are
 * numbered in the order the posts were published, so the first post is episode 1. Generic over the
 * entry, so a page keeps the collection's own entry type to render the post.
 */
import type { BlogPostFrontmatter } from "./blog-post-schema.ts";
import { readingMinutes } from "./reading-time.ts";

/** A collection entry: its id is the Markdown file name, the post's slug; its body the Markdown. */
export interface BlogPostEntry {
  readonly id: string;
  readonly body?: string | undefined;
  readonly data: BlogPostFrontmatter;
}

export interface BlogPost<Entry extends BlogPostEntry = BlogPostEntry> {
  readonly entry: Entry;
  readonly slug: string;
  readonly href: string;
  readonly episode: number;
  readonly readingMinutes: number;
}

/** Post pages are directories, as Astro builds them and the sitemap lists them. */
const BLOG_HREF = "/blog";

function publishedEarlier(first: BlogPostEntry, second: BlogPostEntry): number {
  const byDate = first.data.pubDate.getTime() - second.data.pubDate.getTime();
  return byDate === 0 ? first.id.localeCompare(second.id) : byDate;
}

function bodyOf(entry: BlogPostEntry): string {
  if (entry.body === undefined) {
    throw new Error(`The blog post ${entry.id} has no body to time the reading of.`);
  }
  return entry.body;
}

function blogPost<Entry extends BlogPostEntry>(entry: Entry, episode: number): BlogPost<Entry> {
  return {
    entry,
    slug: entry.id,
    href: `${BLOG_HREF}/${entry.id}/`,
    episode,
    readingMinutes: readingMinutes(bodyOf(entry)),
  };
}

export function blogPostsNewestFirst<Entry extends BlogPostEntry>(
  entries: readonly Entry[],
): BlogPost<Entry>[] {
  return entries
    .toSorted(publishedEarlier)
    .map((entry, index) => blogPost(entry, index + 1))
    .toReversed();
}

/** The post published last: Home's "latest writing" line (#15). */
export function newestPost<Post extends BlogPost>(posts: readonly Post[]): Post {
  const [newest] = posts;
  if (newest === undefined) {
    throw new Error("The blog has no post, so Home has no latest writing to show.");
  }
  return newest;
}
