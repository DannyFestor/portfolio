/** The blog's RSS feed (#16): every post, newest first, linked on the site's festor.info origin. */
import type { RSSFeedItem, RSSOptions } from "@astrojs/rss";

import { SITE_URL } from "../consts.ts";
import { BLOG_FEED } from "./blog-content.ts";
import type { BlogPost } from "./blog-post.ts";

function feedItem({ entry, href }: BlogPost): RSSFeedItem {
  const { title, description, pubDate, tags } = entry.data;
  return { title, description, pubDate, categories: [...tags], link: href };
}

export function blogFeed(posts: readonly BlogPost[]): RSSOptions {
  return {
    title: BLOG_FEED.title,
    description: BLOG_FEED.description,
    site: SITE_URL,
    items: posts.map((post) => feedItem(post)),
  };
}
