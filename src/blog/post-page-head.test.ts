import { describe, expect, it } from "vite-plus/test";

import { postPageTitle } from "./post-page-head.ts";

const LONGEST_TITLE = 70;

describe("the <title> of a post page (#16)", () => {
  it("names the post and the author", () => {
    expect(postPageTitle("Laravel Websockets with Soketi")).toBe(
      "Laravel Websockets with Soketi — Danny Festor",
    );
  });

  it("drops the author when both would pass 70 characters", () => {
    const title = "A post title of exactly sixty characters, give or take a few";
    expect(postPageTitle(title)).toBe(title);
  });

  it("cuts a post title longer than 70 characters at a word, with an ellipsis", () => {
    const title =
      "Laravel's most underrated security feature - What actually is a signed url, and how do they work?";
    expect(postPageTitle(title)).toBe(
      "Laravel's most underrated security feature - What actually is a…",
    );
  });

  it("is never longer than 70 characters", () => {
    expect(postPageTitle("word ".repeat(LONGEST_TITLE)).length).toBeLessThanOrEqual(LONGEST_TITLE);
  });
});
