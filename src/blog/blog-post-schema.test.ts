import { describe, expect, it } from "vite-plus/test";

import { blogPostSchema } from "./blog-post-schema.ts";

const VALID_FRONTMATTER = {
  title: "An example post",
  description: "What the example post is about.",
  pubDate: "2024-04-17",
  tags: ["Laravel", "PHP"],
};

function parse(
  frontmatter: Readonly<Record<string, unknown>>,
): ReturnType<typeof blogPostSchema.safeParse> {
  return blogPostSchema.safeParse(frontmatter);
}

function withoutField(field: keyof typeof VALID_FRONTMATTER): Record<string, unknown> {
  return Object.fromEntries(Object.entries(VALID_FRONTMATTER).filter(([key]) => key !== field));
}

describe("the blog post frontmatter (#15)", () => {
  it("parses valid frontmatter, dates as dates", () => {
    expect(parse(VALID_FRONTMATTER).data).toStrictEqual({
      ...VALID_FRONTMATTER,
      pubDate: new Date("2024-04-17"),
    });
  });

  it("takes an optional updated date", () => {
    expect(parse({ ...VALID_FRONTMATTER, updatedDate: "2024-05-01" }).data?.updatedDate).toEqual(
      new Date("2024-05-01"),
    );
  });

  it.each(["title", "description", "pubDate", "tags"] as const)("rejects a missing %s", (field) => {
    expect(parse(withoutField(field)).success).toBe(false);
  });

  it.each([
    ["an empty title", { title: "" }],
    ["an empty description", { description: "" }],
    ["a publication date that is no date", { pubDate: "someday" }],
    ["an updated date that is no date", { updatedDate: "later" }],
    ["tags that are no list", { tags: "Laravel" }],
    ["an empty tag", { tags: ["Laravel", ""] }],
  ])("rejects %s", (_, invalidFields) => {
    expect(parse({ ...VALID_FRONTMATTER, ...invalidFields }).success).toBe(false);
  });
});
