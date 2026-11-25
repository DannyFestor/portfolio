import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { blogPostSchema } from "./blog/blog-post-schema.ts";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogPostSchema,
});

export const collections = { blog };
