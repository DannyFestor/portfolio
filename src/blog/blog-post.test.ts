import { describe, expect, it } from "vite-plus/test";

import { blogPostsNewestFirst, newestPost } from "./blog-post.ts";
import type { BlogPostEntry } from "./blog-post.ts";

const WORDS_FOR_TWO_MINUTES = Array.from({ length: 440 }, () => "word").join(" ");

function entry(id: string, pubDate: string): BlogPostEntry {
  return {
    id,
    body: WORDS_FOR_TWO_MINUTES,
    data: {
      title: `About ${id}`,
      description: `What ${id} is about.`,
      pubDate: new Date(pubDate),
      tags: ["PHP"],
    },
  };
}

const SECOND_EPISODE = 2;
const THIRD_EPISODE = 3;

const FIRST = entry("first", "2023-01-01");
const SECOND = entry("second", "2024-03-07");
const THIRD = entry("third", "2024-04-17");

describe("the blog posts (#16)", () => {
  it("are listed newest first, in any collection order", () => {
    const slugs = blogPostsNewestFirst([SECOND, THIRD, FIRST]).map(({ slug }) => slug);
    expect(slugs).toStrictEqual(["third", "second", "first"]);
  });

  it("are numbered as episodes in the order they were published, the first post first", () => {
    const episodes = blogPostsNewestFirst([THIRD, FIRST, SECOND]).map(({ episode }) => episode);
    expect(episodes).toStrictEqual([THIRD_EPISODE, SECOND_EPISODE, 1]);
  });

  it("number posts of the same day by their slug", () => {
    const sameDay = entry("another", "2024-04-17");
    const posts = blogPostsNewestFirst([THIRD, sameDay]);
    expect(posts.map(({ slug, episode }) => [slug, episode])).toStrictEqual([
      ["third", SECOND_EPISODE],
      ["another", 1],
    ]);
  });

  it("take their slug, link and reading time from the entry", () => {
    const [post] = blogPostsNewestFirst([FIRST]);
    expect(post).toStrictEqual({
      entry: FIRST,
      slug: "first",
      href: "/blog/first/",
      episode: 1,
      readingMinutes: 2,
    });
  });

  it("need a body to time the reading", () => {
    const { body: _body, ...withoutBody } = FIRST;
    expect(() => blogPostsNewestFirst([withoutBody])).toThrow(
      "The blog post first has no body to time the reading of.",
    );
  });
});

describe("the newest post (#15)", () => {
  it("is the first of the newest-first list", () => {
    expect(newestPost(blogPostsNewestFirst([FIRST, THIRD, SECOND])).slug).toBe("third");
  });

  it("fails the build while the blog has no post", () => {
    expect(() => newestPost([])).toThrow("no post");
  });
});
