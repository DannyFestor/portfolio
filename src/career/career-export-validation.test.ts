import { describe, expect, it } from "vite-plus/test";

import { validCareerExport } from "./career-export-validation.ts";
import { careerExportFixture, projectFixture } from "./test-support/career-fixtures.ts";

describe("validating a career export against the kept schema", () => {
  it("passes an export that follows the schema", () => {
    const career = careerExportFixture();
    expect(validCareerExport(career)).toStrictEqual(career);
  });

  it("refuses a missing key", () => {
    const { languages: _, ...withoutLanguages } = careerExportFixture();
    expect(() => validCareerExport(withoutLanguages)).toThrow(/languages/u);
  });

  it("refuses a key the schema does not know", () => {
    expect(() => validCareerExport({ ...careerExportFixture(), rate: "secret" })).toThrow(
      /additional properties/u,
    );
  });

  it("refuses a month that is not YYYY-MM", () => {
    const career = careerExportFixture({ projects: [projectFixture({ start: "2020-13" })] });
    expect(() => validCareerExport(career)).toThrow(/\/projects\/0\/start/u);
  });

  it("refuses another schema version", () => {
    expect(() => validCareerExport({ ...careerExportFixture(), schema_version: 2 })).toThrow(
      /schema_version/u,
    );
  });
});
