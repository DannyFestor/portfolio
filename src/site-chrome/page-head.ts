/**
 * What a page tells search engines and link previews: its title, description, canonical URL, Open
 * Graph type and structured data. Pages without their own head use the site's.
 */
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts.ts";
import type { JsonLdNode } from "../seo/json-ld.ts";

type OpenGraphType = "website" | "article";

export interface PageHead {
  readonly title: string;
  readonly description: string;
  /** The page's own path when absent. A page showing another page's content names that page. */
  readonly canonicalPath?: string;
  readonly openGraphType: OpenGraphType;
  /** The schema.org nodes the page describes; none when absent. */
  readonly structuredData?: readonly JsonLdNode[];
}

export const SITE_PAGE_HEAD: PageHead = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraphType: "website",
};
