import { describe, expect, it } from "vite-plus/test";

import { CAREER } from "../../src/career/career-data.ts";
import { FEATURED_PROJECT_COUNT, featuredProjects } from "../../src/career/project-extras.ts";
import { PROJECT_EXTRAS } from "../../src/data/project-extras.ts";

describe("the project extras (#13)", () => {
  it("belong to projects in career.json, so renaming a vault note breaks the build", () => {
    const unknownNotes = Object.keys(PROJECT_EXTRAS).filter((note) => !CAREER.hasProject(note));
    expect(unknownNotes).toStrictEqual([]);
  });

  it(`feature ${String(FEATURED_PROJECT_COUNT)} projects at most, as Home shows`, () => {
    expect(featuredProjects(CAREER.projects, PROJECT_EXTRAS).length).toBeLessThanOrEqual(
      FEATURED_PROJECT_COUNT,
    );
  });
});
