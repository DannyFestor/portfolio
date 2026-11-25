import { describe, expect, it } from "vite-plus/test";

import { blogFeed } from "./blog-feed.ts";
import { blogPostsNewestFirst } from "./blog-post.ts";

const [post] = blogPostsNewestFirst([
  {
    id: "signed-urls",
    body: "Signed URLs are underrated.",
    data: {
      title: "Signed URLs",
      description: "What a signed URL is.",
      pubDate: new Date("2024-04-17"),
      tags: ["Laravel", "Security"],
    },
  },
]);

describe("the blog's RSS feed (#16)", () => {
  const feed = blogFeed(post === undefined ? [] : [post]);

  it("links the posts on festor.info", () => {
    expect(feed.site).toBe("https://festor.info");
  });

  it("has the chapter's title", () => {
    expect(feed.title).toBe("Danny Festor — Writing");
  });

  it("lists every post with its title, description, date, tags and link", () => {
    expect(feed.items).toStrictEqual([
      {
        title: "Signed URLs",
        description: "What a signed URL is.",
        pubDate: new Date("2024-04-17"),
        categories: ["Laravel", "Security"],
        link: "/blog/signed-urls/",
      },
    ]);
  });
});
