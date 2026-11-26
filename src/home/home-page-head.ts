import { HOME_STRUCTURED_DATA } from "../seo/site-structured-data.ts";
import { SITE_PAGE_HEAD } from "../site-chrome/page-head.ts";
import type { PageHead } from "../site-chrome/page-head.ts";

/** Home's head: the site's title and description, and who the site is by (#20). */
export const HOME_PAGE_HEAD: PageHead = { ...SITE_PAGE_HEAD, structuredData: HOME_STRUCTURED_DATA };
