// /llms.txt (#20): the site summarised for language models (llmstxt.org).
import { getCollection } from "astro:content";

import { blogPostsNewestFirst } from "../blog/blog-post";
import { CAREER } from "../career/career-data";
import { PROJECT_EXTRAS } from "../data/project-extras";
import { llmsDocument } from "../seo/llms-content";
import { llmsTxt } from "../seo/llms-txt";
import { plainTextResponse } from "../seo/plain-text-response";
import { caseStudiesNewestFirst } from "../work/case-study";

export async function GET(): Promise<Response> {
  const studies = caseStudiesNewestFirst(
    await getCollection("caseStudies"),
    CAREER,
    PROJECT_EXTRAS,
  );
  const posts = blogPostsNewestFirst(await getCollection("blog"));
  return plainTextResponse(llmsTxt(llmsDocument(studies, posts)));
}
