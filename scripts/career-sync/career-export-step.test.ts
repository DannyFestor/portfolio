import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { careerExportFixture } from "../../src/career/test-support/career-fixtures.ts";
import { CAREER_DATA_FILE, CAREER_SCHEMA_FILE, syncCareerExport } from "./career-export-step.ts";

const KEPT_SCHEMA = readFileSync(CAREER_SCHEMA_FILE, "utf8");
const EXPORT_JSON = JSON.stringify(careerExportFixture());
const PREVIOUS_EXPORT = "previous career.json";

let workDirectory = "";
let schemaFile = "";

function siteFile(path: string): string {
  return join(workDirectory, "site", path);
}

function syncFrom(json: () => string): void {
  syncCareerExport({ json, schemaFile }, join(workDirectory, "site"));
}

function failingKariera(): string {
  throw new Error("kariera export --json exited with 1");
}

beforeEach(() => {
  workDirectory = mkdtempSync(join(tmpdir(), "career-export-"));
  schemaFile = join(workDirectory, "kariera", "career-export.schema.json");
  mkdirSync(join(workDirectory, "kariera"));
  writeFileSync(schemaFile, KEPT_SCHEMA);
});

afterEach(() => {
  rmSync(workDirectory, { recursive: true, force: true });
});

describe("syncing the career export", () => {
  it("writes the export to career.json as kariera prints it", () => {
    syncFrom(() => EXPORT_JSON);
    expect(readFileSync(siteFile(CAREER_DATA_FILE), "utf8")).toBe(EXPORT_JSON);
  });

  it("keeps a copy of kariera's schema next to it", () => {
    syncFrom(() => EXPORT_JSON);
    expect(readFileSync(siteFile(CAREER_SCHEMA_FILE), "utf8")).toBe(KEPT_SCHEMA);
  });

  it("fails loudly and writes nothing when kariera fails", () => {
    expect(() => {
      syncFrom(failingKariera);
    }).toThrow(/nothing was written/u);
    expect([CAREER_DATA_FILE, CAREER_SCHEMA_FILE].some((path) => existsSync(siteFile(path)))).toBe(
      false,
    );
  });

  it("keeps the previous career.json when kariera fails", () => {
    mkdirSync(join(workDirectory, "site", "src", "data"), { recursive: true });
    writeFileSync(siteFile(CAREER_DATA_FILE), PREVIOUS_EXPORT);
    expect(() => {
      syncFrom(failingKariera);
    }).toThrow(/kariera export --json exited with 1/u);
    expect(readFileSync(siteFile(CAREER_DATA_FILE), "utf8")).toBe(PREVIOUS_EXPORT);
  });

  it("writes nothing when the export does not follow kariera's schema", () => {
    expect(() => {
      syncFrom(() => JSON.stringify({ schema_version: 1 }));
    }).toThrow(/does not follow/u);
    expect(existsSync(siteFile(CAREER_DATA_FILE))).toBe(false);
  });

  it("writes nothing when the export is not JSON", () => {
    expect(() => {
      syncFrom(() => "not json");
    }).toThrow(/nothing was written/u);
    expect(existsSync(siteFile(CAREER_DATA_FILE))).toBe(false);
  });
});
