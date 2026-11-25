import { readFileSync } from "node:fs";

import { describe, expect, it } from "vite-plus/test";

import { CAREER_DATA_FILE } from "../../scripts/career-sync/career-export-step.ts";
import { validCareerExport } from "../../src/career/career-export-validation.ts";

describe("career.json (#13)", () => {
  it("is valid against the kept kariera schema", () => {
    const careerJson: unknown = JSON.parse(readFileSync(CAREER_DATA_FILE, "utf8"));
    expect(() => validCareerExport(careerJson)).not.toThrow();
  });
});
