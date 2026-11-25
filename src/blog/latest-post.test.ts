import { describe, expect, it } from "vite-plus/test";

import { latestPost } from "./latest-post.ts";

function post(id: string, pubDate: string): { id: string; data: { pubDate: Date } } {
  return { id, data: { pubDate: new Date(pubDate) } };
}

describe("the latest post (#15)", () => {
  it("is the post published last, in any collection order", () => {
    const posts = [
      post("older", "2024-03-07"),
      post("newest", "2024-04-17"),
      post("old", "2023-01-01"),
    ];
    expect(latestPost(posts).id).toBe("newest");
  });

  it("fails the build while the blog has no post", () => {
    expect(() => latestPost([])).toThrow("no post");
  });
});
