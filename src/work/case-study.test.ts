import { describe, expect, it } from "vite-plus/test";

import { careerFrom } from "../career/career.ts";
import type { ProjectExtrasByNote } from "../career/project-extras.ts";
import { careerExportFixture, projectFixture } from "../career/test-support/career-fixtures.ts";
import { caseStudiesNewestFirst, newestCaseStudy } from "./case-study.ts";
import type { CaseStudyEntry } from "./case-study.ts";

const OLDER = projectFixture({ note: "Example - Older", start: "2019-01", end: "2020-06" });
const NEWER = projectFixture({ note: "Example - Newer", start: "2024-05", end: null });
const career = careerFrom(careerExportFixture({ projects: [OLDER, NEWER] }));

const EXTRAS: ProjectExtrasByNote = {
  [OLDER.note]: { sfx: "シュッ", impactLine: "Older impact." },
  [NEWER.note]: { sfx: "ドン", impactLine: "Newer impact.", track: "rescue" },
};

function entry(id: string, project: string): CaseStudyEntry {
  return { id, data: { project, description: `About ${id}.` } };
}

const OLDER_ENTRY = entry("older-study", OLDER.note);
const NEWER_ENTRY = entry("newer-study", NEWER.note);
const ENTRIES = [OLDER_ENTRY, NEWER_ENTRY];

describe("the case studies", () => {
  it("are ordered by their project, newest first", () => {
    const slugs = caseStudiesNewestFirst(ENTRIES, career, EXTRAS).map(({ slug }) => slug);
    expect(slugs).toStrictEqual(["newer-study", "older-study"]);
  });

  it("read their project, period and track from the career data and the extras", () => {
    const [newest] = caseStudiesNewestFirst(ENTRIES, career, EXTRAS);
    expect(newest).toStrictEqual({
      entry: NEWER_ENTRY,
      slug: "newer-study",
      href: "/work/newer-study/",
      description: "About newer-study.",
      project: NEWER,
      period: "2024 — now",
      track: "rescue",
      impact: { sfx: "ドン", line: "Newer impact." },
    });
  });

  it("leave the track out until it is decided", () => {
    const [, oldest] = caseStudiesNewestFirst(ENTRIES, career, EXTRAS);
    expect(oldest?.track).toBeUndefined();
  });

  it("need an SFX for their impact panel", () => {
    const extras = { ...EXTRAS, [OLDER.note]: { impactLine: "Older impact." } };
    expect(() => caseStudiesNewestFirst(ENTRIES, career, extras)).toThrow(
      'The case study of "Example - Older" needs an sfx and an impactLine in src/data/project-extras.ts.',
    );
  });

  it("need an impact line for their impact panel", () => {
    const extras = { ...EXTRAS, [NEWER.note]: { sfx: "ドン" as const } };
    expect(() => caseStudiesNewestFirst(ENTRIES, career, extras)).toThrow(
      'The case study of "Example - Newer" needs an sfx and an impactLine in src/data/project-extras.ts.',
    );
  });
});

describe("the study /work opens", () => {
  it("is the newest", () => {
    const studies = caseStudiesNewestFirst(ENTRIES, career, EXTRAS);
    expect(newestCaseStudy(studies).slug).toBe("newer-study");
  });

  it("must exist", () => {
    expect(() => newestCaseStudy([])).toThrow(
      "/work opens the newest case study, but src/content/case-studies has none.",
    );
  });
});
