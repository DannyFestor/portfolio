/**
 * The site's robots.txt (#20): open to every crawler, and by name to the AI crawlers that read the
 * site for assistants, so a later catch-all rule cannot shut them out by accident.
 */
export const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot"] as const;

const EVERY_CRAWLER = "*";
const WHOLE_SITE = "/";

function allowGroup(userAgent: string): string {
  return `User-agent: ${userAgent}\nAllow: ${WHOLE_SITE}\n`;
}

export function robotsTxt(sitemapUrl: string): string {
  const groups = [EVERY_CRAWLER, ...AI_CRAWLERS].map((userAgent) => allowGroup(userAgent));
  return [...groups, `Sitemap: ${sitemapUrl}\n`].join("\n");
}

/** Where @astrojs/sitemap writes the sitemap index. */
export const SITEMAP_INDEX_PATH = "/sitemap-index.xml";
