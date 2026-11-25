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

type ParsedFrontmatter = z.infer<typeof blogPostSchema>;

/** The frontmatter as the pages read it: nothing in it changes once the collection has loaded. */
export interface BlogPostFrontmatter extends Readonly<
  Omit<ParsedFrontmatter, "pubDate" | "updatedDate" | "tags">
> {
  readonly pubDate: Readonly<Date>;
  readonly updatedDate?: Readonly<Date> | undefined;
  readonly tags: readonly string[];
}
