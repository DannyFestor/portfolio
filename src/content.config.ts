import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { blogPostSchema } from "./blog/blog-post-schema.ts";
import { CAREER } from "./career/career-data.ts";
import { caseStudySchema } from "./work/case-study-schema.ts";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogPostSchema,
});

/** The case studies (#17), written by hand in first person; each names its project's vault note. */
const caseStudies = defineCollection({
  loader: glob({ base: "./src/content/case-studies", pattern: "**/*.mdx" }),
  schema: caseStudySchema(CAREER),
});

export const collections = { blog, caseStudies };
