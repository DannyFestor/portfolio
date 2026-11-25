import { describe, expect, it } from "vite-plus/test";

import { careerFrom } from "../career/career.ts";
import { careerExportFixture, projectFixture } from "../career/test-support/career-fixtures.ts";
import { caseStudySchema } from "./case-study-schema.ts";

const PROJECT = projectFixture({ note: "Example Co - Shop" });
const schema = caseStudySchema(careerFrom(careerExportFixture({ projects: [PROJECT] })));

const VALID_FRONTMATTER = { project: PROJECT.note, description: "How the shop got fast." };

describe("the case study frontmatter", () => {
  it("names a project of career.json and describes the study", () => {
    expect(schema.parse(VALID_FRONTMATTER)).toStrictEqual(VALID_FRONTMATTER);
  });

  it("refuses a project that is not in career.json", () => {
    const result = schema.safeParse({ ...VALID_FRONTMATTER, project: "Example Co - Renamed" });
    expect(result.error?.issues.map(({ message }) => message)).toStrictEqual([
      'career.json has no project note named "Example Co - Renamed".',
    ]);
  });

  it("refuses a study without a description", () => {
    expect(schema.safeParse({ project: PROJECT.note }).success).toBe(false);
  });

  it("refuses an empty description", () => {
    expect(schema.safeParse({ ...VALID_FRONTMATTER, description: "" }).success).toBe(false);
  });

  it("refuses career facts typed again, such as the title", () => {
    expect(schema.safeParse({ ...VALID_FRONTMATTER, title: "Shop" }).success).toBe(false);
  });
});
