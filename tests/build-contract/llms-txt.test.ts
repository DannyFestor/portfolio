import { describe, expect, it } from "vite-plus/test";

import { CAREER } from "../../src/career/career-data.ts";
import { AVAILABILITY_STATUS, POSITIONING_LINE, SITE_AUTHOR } from "../../src/consts.ts";
import { siteUrlOf } from "../../src/seo/site-url.ts";
import { personalDataFound } from "../privacy/personal-data.ts";
import { builtPages, leadsToBuiltFileOnSite, readBuiltFile } from "./built-site.ts";

const llms = readBuiltFile("llms.txt");
const LINK = /\]\((?<url>[^)\s]+)\)/gu;
const links = Array.from(llms.matchAll(LINK), (match) => match.groups?.["url"] ?? "");

describe("/llms.txt (#20)", () => {
  it("is titled with Danny's name and summed up with the positioning line", () => {
    const [title, summary] = llms.split("\n\n");
    expect(title).toBe(`# ${SITE_AUTHOR}`);
    expect(summary).toMatch(/^> /u);
    expect(summary).toContain(POSITIONING_LINE);
  });

  it("gives the status line and every language in career.json", () => {
    expect(llms).toContain(AVAILABILITY_STATUS);
    expect(CAREER.languages.filter(({ name }) => !llms.includes(name))).toStrictEqual([]);
  });

  it("links every page of the site", () => {
    const pageUrls = builtPages().map(({ urlPath }) => siteUrlOf(urlPath));
    expect(pageUrls.filter((url) => !links.includes(url))).toStrictEqual([]);
  });

  it("links only files the site builds, on festor.info", () => {
    expect(links.filter((url) => !leadsToBuiltFileOnSite(url))).toStrictEqual([]);
  });

  it("holds no phone number, no email but the two allowed and no personal label", () => {
    expect(personalDataFound(llms)).toStrictEqual([]);
  });
});
