import { SITE_AUTHOR } from "../consts.ts";
import type { PageHead } from "../site-chrome/page-head.ts";
import type { BlogPost } from "./blog-post.ts";

/** The longest <title> html-validate accepts (its long-title rule). */
const LONGEST_TITLE = 70;
const ELLIPSIS = "…";
const WORD_BREAK = " ";

function cutAtWord(text: string, longest: number): string {
  const cut = text.slice(0, longest - ELLIPSIS.length + 1);
  const lastBreak = cut.lastIndexOf(WORD_BREAK);
  return `${cut.slice(0, lastBreak > 0 ? lastBreak : cut.length - 1)}${ELLIPSIS}`;
}

/**
 * A post page's <title>: the post's title and the author, then the title alone if both are too
 * long, then the title cut at a word. The page's heading always shows the whole title.
 */
export function postPageTitle(title: string): string {
  const withAuthor = `${title} — ${SITE_AUTHOR}`;
  if (withAuthor.length <= LONGEST_TITLE) {
    return withAuthor;
  }
  return title.length <= LONGEST_TITLE ? title : cutAtWord(title, LONGEST_TITLE);
}

/** A post's own title and link preview (#16). */
export function postPageHead({ entry }: BlogPost): PageHead {
  return {
    title: postPageTitle(entry.data.title),
    description: entry.data.description,
    openGraphType: "article",
  };
}
