/**
 * The frontmatter of a case study (#17): the vault note of its project and a description for search
 * and link previews. Period, role, team size, stack and title come from career.json and are never
 * typed again, so the schema refuses any other key.
 */
import { z } from "astro/zod";

import type { Career } from "../career/career.ts";

/** What the schema reads from the career: whether a project note exists. */
type CareerProjectNotes = Readonly<Pick<Career, "hasProject">>;

type CaseStudySchema = z.ZodObject<{ project: z.ZodString; description: z.ZodString }>;

export type CaseStudyFrontmatter = z.infer<CaseStudySchema>;

function unknownProjectMessage(note: unknown): string {
  return `career.json has no project note named "${String(note)}".`;
}

export function caseStudySchema(career: CareerProjectNotes): CaseStudySchema {
  return z.strictObject({
    project: z.string().refine((note) => career.hasProject(note), {
      error: ({ input }) => unknownProjectMessage(input),
    }),
    description: z.string().min(1),
  });
}
