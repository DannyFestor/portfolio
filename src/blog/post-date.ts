/**
 * A post's date: the label in the style decided in #25, `17 April 2024`, and the machine-readable
 * `2024-04-17` of its <time> element. Frontmatter dates are calendar days at midnight UTC, so they
 * are read in UTC.
 */
const POST_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const ISO_DATE_LENGTH = "YYYY-MM-DD".length;

export function postDateTime(date: Readonly<Date>): string {
  return date.toISOString().slice(0, ISO_DATE_LENGTH);
}

export function postDateLabel(date: Readonly<Date>): string {
  return POST_DATE_FORMAT.format(date);
}
