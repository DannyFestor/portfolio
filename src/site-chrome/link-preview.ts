/**
 * A page's canonical URL and the meta tags of its link preview (#20): Open Graph, and the Twitter
 * card for X, which reads the Open Graph title and description. Every preview tag is built here.
 * Every page shows the same share image.
 */
import { SITE_AUTHOR } from "../consts.ts";
import { siteUrlOf } from "../seo/site-url.ts";
import { SHARE_IMAGE_ALT } from "../share-image/share-image-content.ts";
import { SHARE_IMAGE_PATH, SHARE_IMAGE_SIZE } from "../share-image/share-image-file.ts";
import type { PageHead } from "./page-head.ts";

/** A <meta> tag: Open Graph names its key `property`, the Twitter card names it `name`. */
export type MetaTag =
  | { readonly property: string; readonly content: string }
  | { readonly name: string; readonly content: string };

/** The card with the share image drawn large above the title and description. */
const TWITTER_CARD = "summary_large_image";

function shareImageTags(): MetaTag[] {
  const imageUrl = siteUrlOf(SHARE_IMAGE_PATH);
  return [
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: String(SHARE_IMAGE_SIZE.width) },
    { property: "og:image:height", content: String(SHARE_IMAGE_SIZE.height) },
    { property: "og:image:alt", content: SHARE_IMAGE_ALT },
    { name: "twitter:card", content: TWITTER_CARD },
    { name: "twitter:image", content: imageUrl },
  ];
}

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
    ...shareImageTags(),
  ];
}
