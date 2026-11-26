import { SITE_URL } from "../consts.ts";

/** A path on the site as a full URL on the production origin. */
export function siteUrlOf(path: string): string {
  return new URL(path, SITE_URL).href;
}
