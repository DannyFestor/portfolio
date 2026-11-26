import { describe, expect, it } from "vite-plus/test";

import { smokeTestUrls } from "../../scripts/smoke-test/smoke-test-urls.ts";
import { leadsToBuiltFileOnSite, readBuiltUrlPath } from "./built-site.ts";

const urls = smokeTestUrls(readBuiltUrlPath);

describe("the post-deploy smoke test's URLs (#21)", () => {
  it("lead only to files the site builds, on festor.info", () => {
    expect(urls.filter((url) => !leadsToBuiltFileOnSite(url))).toStrictEqual([]);
  });
});
