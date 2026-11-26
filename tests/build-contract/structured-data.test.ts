import { describe, expect, it } from "vite-plus/test";

import { CAREER } from "../../src/career/career-data.ts";
import { PROFILE_LINKS } from "../../src/site-chrome/back-cover-content.ts";
import { builtPages, readBuiltFile } from "./built-site.ts";

const JSON_LD = /<script type="application\/ld\+json">(?<json>[\s\S]*?)<\/script>/gu;

interface Node {
  readonly "@type": string;
  readonly [property: string]: unknown;
}

interface Graph {
  readonly "@graph": Node[];
}

function isGraph(value: unknown): value is Graph {
  return typeof value === "object" && value !== null && "@graph" in value;
}

function graphNodes(json: string): Node[] {
  const parsed: unknown = JSON.parse(json);
  return isGraph(parsed) ? parsed["@graph"] : [];
}

/** Every schema.org node the page's JSON-LD graphs describe. */
function structuredData(html: string): Node[] {
  return Array.from(html.matchAll(JSON_LD), (match) =>
    graphNodes(match.groups?.["json"] ?? ""),
  ).flat();
}

function nodeOfType(page: string, type: string): Node | undefined {
  return structuredData(readBuiltFile(page)).find((node) => node["@type"] === type);
}

describe("the structured data (#20)", () => {
  it.each(["index.html", "about/index.html"])("%s describes Danny as a Person", (page) => {
    expect(nodeOfType(page, "Person")).toMatchObject({
      name: CAREER.profile.name,
      knowsLanguage: CAREER.languages.map(({ name }) => name),
      sameAs: PROFILE_LINKS.map(({ href }) => href),
    });
  });

  it("uses no ProfessionalService, which schema.org retired", () => {
    const types = builtPages().flatMap(({ html }) =>
      structuredData(html).map((node) => node["@type"]),
    );
    expect(types).not.toContain("ProfessionalService");
  });
});
