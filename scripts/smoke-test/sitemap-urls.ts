import { SITEMAP_INDEX_PATH } from "../../src/seo/robots-txt.ts";

/** Reads a file of the built site by its URL path: `/sitemap-0.xml` reads dist/sitemap-0.xml. */
export type BuiltFileReader = (urlPath: string) => string;

const LOCATION = /<loc>(?<url>[^<]*)<\/loc>/gu;

function locationsIn(sitemap: string): string[] {
  return Array.from(sitemap.matchAll(LOCATION), (match) => match.groups?.["url"] ?? "");
}

/** The page URLs of every sitemap the built sitemap index lists. */
export function sitemapPageUrls(readBuiltFile: BuiltFileReader): string[] {
  const sitemaps = locationsIn(readBuiltFile(SITEMAP_INDEX_PATH));
  return sitemaps.flatMap((sitemap) => locationsIn(readBuiltFile(new URL(sitemap).pathname)));
}
