/** Where the site is published; canonical URLs and the sitemap start with it. */
export const SITE_URL = "https://festor.info";

export const SITE_TITLE = "Danny Festor — Freelance Software Engineer";
export const SITE_DESCRIPTION =
  "Freelance software engineering based in Japan — handcrafted or AI-assisted, everything gets engineered before it ships.";

export const SITE_AUTHOR = "Danny Festor";
export const SITE_PLACE = "Nagasaki, Japan";

/** The alternative text of the one photo of Danny, printed through the halftone pipeline. */
export const PORTRAIT_ALT = `${SITE_AUTHOR}, smiling, a camera in hand`;

/** The one address the site writes from (#30). */
export const CONTACT_EMAIL = "hello@festor.info";

/** The availability status, locked: written on the site, never read from the career vault. */
export const AVAILABILITY_STATUS = "Open for new projects";

/**
 * The positioning line and its subline, locked in #6. Home letters the line as two beats: the quiet
 * one, then the impact one.
 */
export const POSITIONING_BEATS = {
  quiet: "AI does the writing.",
  impact: "I do the engineering.",
} as const;
export const POSITIONING_LINE = `${POSITIONING_BEATS.quiet} ${POSITIONING_BEATS.impact}`;
export const POSITIONING_SUBLINE =
  "Handcrafted or AI-assisted — everything gets engineered before it ships.";
