/**
 * A post's reading time (#16): its words at an average reading pace, rounded to whole minutes and
 * never under one. The words are counted in the post's Markdown source, code blocks included.
 */
const WORDS_PER_MINUTE = 220;
const MINIMUM_MINUTES = 1;
const WORD_SEPARATOR = /\s+/u;

function wordCount(text: string): number {
  return text.split(WORD_SEPARATOR).filter((word) => word !== "").length;
}

export function readingMinutes(markdown: string): number {
  return Math.max(MINIMUM_MINUTES, Math.round(wordCount(markdown) / WORDS_PER_MINUTE));
}

export function readingTimeLabel(minutes: number): string {
  return `${String(minutes)} min read`;
}
