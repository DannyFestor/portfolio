// robots.txt (#20), pointing crawlers to the sitemap.
import { plainTextResponse } from "../seo/plain-text-response";
import { robotsTxt, SITEMAP_INDEX_PATH } from "../seo/robots-txt";
import { siteUrlOf } from "../seo/site-url";

export function GET(): Response {
  return plainTextResponse(robotsTxt(siteUrlOf(SITEMAP_INDEX_PATH)));
}
