import { describe, expect, it } from "vite-plus/test";

import type { Qualification } from "../career/career-export.ts";
import { degreeLines, languageLines } from "./profile-facts.ts";

function qualification(overrides: Partial<Qualification>): Qualification {
  return {
    name: "BSc Example",
    category: "degree",
    issuer: "Example University",
    start: "2012-10",
    date: "2016-11",
    level: null,
    score: null,
    ...overrides,
  };
}

describe("the languages profile fact (#18)", () => {
  it("lists each language with its level, in export order", () => {
    const languages = [
      { name: "German", level: "Native" },
      { name: "Japanese", level: null },
    ];
    expect(languageLines(languages)).toStrictEqual([
      { text: "German", note: "Native" },
      { text: "Japanese", note: null },
    ]);
  });
});

describe("the education profile fact (#18)", () => {
  it("lists the university degrees with their university and year, in export order", () => {
    const degrees = [
      qualification({ name: "MA Example", start: "2010-10", date: "2012-10" }),
      qualification({ name: "BA Example", issuer: null, start: "2005-10", date: "2009-07" }),
    ];
    expect(degreeLines(degrees)).toStrictEqual([
      { text: "MA Example", note: "Example University, 2012" },
      { text: "BA Example", note: "2009" },
    ]);
  });

  it("leaves out school leaving certificates, certificates and test results", () => {
    const others = [
      qualification({ name: "Abitur", start: null, date: "2004-06" }),
      qualification({ name: "JLPT N2", category: "test-result", start: null }),
      qualification({ name: "Licence", category: "licence", start: null }),
    ];
    expect(degreeLines(others)).toStrictEqual([]);
  });
});
