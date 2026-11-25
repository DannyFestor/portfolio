/** The frontmatter of a blog post (#15), validated when the blog collection loads. */
import { z } from "astro/zod";

const nonEmptyText = z.string().min(1);

export const blogPostSchema = z.object({
  title: nonEmptyText,
  description: nonEmptyText,
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(nonEmptyText),
});
