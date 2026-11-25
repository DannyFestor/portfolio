// The blog's RSS feed (#16) at /rss.xml.
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { blogFeed } from "../blog/blog-feed";
import { blogPostsNewestFirst } from "../blog/blog-post";

export async function GET(): Promise<Response> {
  return rss(blogFeed(blogPostsNewestFirst(await getCollection("blog"))));
}
