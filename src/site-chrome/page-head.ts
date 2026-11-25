/**
 * What a page tells search engines and link previews: its title, description, canonical URL and
 * Open Graph type. Pages without their own head use the site's.
 */
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts.ts";

type OpenGraphType = "website" | "article";

export interface PageHead {
  readonly title: string;
  readonly description: string;
  /** The page's own path when absent. A page showing another page's content names that page. */
  readonly canonicalPath?: string;
  readonly openGraphType: OpenGraphType;
}

export const SITE_PAGE_HEAD: PageHead = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraphType: "website",
};
