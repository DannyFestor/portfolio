import { BLOG_FEED } from "../../src/blog/blog-content.ts";
import { PUBLIC_RESUMES } from "../../src/career/public-resumes.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { SHARE_IMAGE_PATH } from "../../src/share-image/share-image-file.ts";
import { sitemapPageUrls } from "./sitemap-urls.ts";
import type { BuiltFileReader } from "./sitemap-urls.ts";

/** The files besides the pages that readers, feed readers, crawlers and link previews fetch. */
const SMOKE_TESTED_FILE_PATHS: readonly string[] = [
  BLOG_FEED.href,
  "/llms.txt",
  "/robots.txt",
  SHARE_IMAGE_PATH,
  ...PUBLIC_RESUMES.map(({ urlPath }) => urlPath),
];

/** Every URL the post-deploy smoke test (#21) expects on festor.info: each sitemap page and file. */
export function smokeTestUrls(readBuiltFile: BuiltFileReader): string[] {
  return [
    ...sitemapPageUrls(readBuiltFile),
    ...SMOKE_TESTED_FILE_PATHS.map((path) => siteUrlOf(path)),
  ];
}
