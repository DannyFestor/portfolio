import { describe, expect, it } from "vite-plus/test";

import { robotsTxt } from "./robots-txt.ts";

const SITEMAP_URL = "https://example.com/sitemap-index.xml";

describe("robots.txt (#20)", () => {
  const lines = robotsTxt(SITEMAP_URL).split("\n");

  it("opens the site to every crawler, and by name to the AI crawlers", () => {
    expect(robotsTxt(SITEMAP_URL)).toBe(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "User-agent: GPTBot",
        "Allow: /",
        "",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "",
        "User-agent: PerplexityBot",
        "Allow: /",
        "",
        "User-agent: ClaudeBot",
        "Allow: /",
        "",
        `Sitemap: ${SITEMAP_URL}`,
        "",
      ].join("\n"),
    );
  });

  it("disallows nothing", () => {
    expect(lines.filter((line) => line.startsWith("Disallow"))).toStrictEqual([]);
  });
});
