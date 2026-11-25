/**
 * A post's episode number (#16), counted in the order the posts were published: 第3話 on the post's
 * frontispiece, 03 in the table of contents. The digits come from the Latin font subset.
 */
const CONTENTS_NUMBER_DIGITS = 2;

export function episodeTitle(episode: number): string {
  return `第${String(episode)}話`;
}

export function contentsNumber(episode: number): string {
  return String(episode).padStart(CONTENTS_NUMBER_DIGITS, "0");
}
