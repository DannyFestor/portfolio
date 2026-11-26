import { join } from "node:path";

import sharp from "sharp";
import { beforeAll, describe, expect, it } from "vite-plus/test";

import { SITE_URL } from "../../src/consts.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { SHARE_IMAGE_PATH } from "../../src/share-image/share-image-file.ts";
import { BUILT_SITE_DIRECTORY, builtPages, findBuiltFiles } from "./built-site.ts";
import { metaContent } from "./page-head.ts";

/** The size Open Graph and X draw large (#20). */
const EXPECTED_SIZE = { width: 1200, height: 630 };
const SHARE_IMAGE_FILE = SHARE_IMAGE_PATH.slice(1);

const pages = builtPages();
let builtSize = { width: 0, height: 0 };

function shareImageTags(html: string): Record<string, string | undefined> {
  return {
    "og:image": metaContent(html, "property", "og:image"),
    "og:image:width": metaContent(html, "property", "og:image:width"),
    "og:image:height": metaContent(html, "property", "og:image:height"),
    "twitter:card": metaContent(html, "name", "twitter:card"),
    "twitter:image": metaContent(html, "name", "twitter:image"),
  };
}

beforeAll(async () => {
  const { width, height } = await sharp(join(BUILT_SITE_DIRECTORY, SHARE_IMAGE_FILE)).metadata();
  builtSize = { width, height };
});

describe("the share image (#20)", () => {
  it("is built at its path", () => {
    expect(findBuiltFiles("**/*.png")).toContain(SHARE_IMAGE_FILE);
  });

  it("is a 1200 × 630 PNG", async () => {
    const { format } = await sharp(join(BUILT_SITE_DIRECTORY, SHARE_IMAGE_FILE)).metadata();
    expect({ format, ...builtSize }).toStrictEqual({ format: "png", ...EXPECTED_SIZE });
  });
});

describe("every page's link preview shows the share image (#20)", () => {
  it.each(pages)("$urlPath points Open Graph and X at the built image, at its size", ({ html }) => {
    expect(shareImageTags(html)).toStrictEqual({
      "og:image": siteUrlOf(SHARE_IMAGE_PATH),
      "og:image:width": String(builtSize.width),
      "og:image:height": String(builtSize.height),
      "twitter:card": "summary_large_image",
      "twitter:image": siteUrlOf(SHARE_IMAGE_PATH),
    });
  });

  it.each(pages)("$urlPath links the image by an absolute URL on festor.info", ({ html }) => {
    expect(new URL(metaContent(html, "property", "og:image") ?? "").origin).toBe(SITE_URL);
  });

  it.each(pages)("$urlPath describes the image", ({ html }) => {
    expect(metaContent(html, "property", "og:image:alt")).toMatch(/\S/u);
  });
});
