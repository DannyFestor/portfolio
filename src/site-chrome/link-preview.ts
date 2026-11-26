/**
 * A page's canonical URL and the meta tags of its link preview (#20): Open Graph, and the Twitter
 * card for X, which reads the Open Graph title and description. Every preview tag is built here.
 */
import { SITE_AUTHOR } from "../consts.ts";
import { siteUrlOf } from "../seo/site-url.ts";
import type { PageHead } from "./page-head.ts";

/** A <meta> tag: Open Graph names its key `property`, the Twitter card names it `name`. */
export type MetaTag =
  | { readonly property: string; readonly content: string }
  | { readonly name: string; readonly content: string };

/** The card without an image: title and description. */
const TWITTER_CARD = "summary";

export function canonicalUrlOf({ canonicalPath }: PageHead, pathname: string): string {
  return siteUrlOf(canonicalPath ?? pathname);
}

export function linkPreviewTags(head: PageHead, canonicalUrl: string): MetaTag[] {
  return [
    { property: "og:type", content: head.openGraphType },
    { property: "og:title", content: head.title },
    { property: "og:description", content: head.description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:site_name", content: SITE_AUTHOR },
    { name: "twitter:card", content: TWITTER_CARD },
  ];
}
