import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

import { careerExportValidation } from "../../src/career/career-export-validation.ts";
import type { CareerSyncStep } from "./career-sync-step.ts";

/** Where the site reads the export, relative to the site root. */
export const CAREER_DATA_FILE = join("src", "data", "career.json");

/** The kept copy of kariera's schema the build validates career.json against. */
export const CAREER_SCHEMA_FILE = join("src", "data", "career-export.schema.json");

/** Kariera's source checkout, which ships the schema its export follows. */
const KARIERA_SCHEMA_FILE = join(
  homedir(),
  "git",
  "kariera",
  "schemas",
  "career-export.schema.json",
);

/** Where the export and its schema come from. */
interface CareerExportSource {
  /** The export as JSON text; throws when kariera refuses to export. */
  readonly json: () => string;
  readonly schemaFile: string;
}

function schemaObject(json: string): object {
  const schema: unknown = JSON.parse(json);
  if (typeof schema !== "object" || schema === null) {
    throw new Error("kariera's schema is not a JSON object.");
  }
  return schema;
}

interface CareerExportFiles {
  readonly careerJson: string;
  readonly schemaJson: string;
}

function checkedExport(source: CareerExportSource): CareerExportFiles {
  const careerJson = source.json();
  const schemaJson = readFileSync(source.schemaFile, "utf8");
  careerExportValidation(schemaObject(schemaJson))(JSON.parse(careerJson));
  return { careerJson, schemaJson };
}

function exportOrRefuse(source: CareerExportSource): CareerExportFiles {
  try {
    return checkedExport(source);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${reason}\nThe career export failed, so nothing was written.`, {
      cause: error,
    });
  }
}

/** Writes beside the target and renames, so a failed write never leaves half a file. */
function writeWhole(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const partial = `${path}.partial`;
  writeFileSync(partial, contents);
  renameSync(partial, path);
}

/** Writes the export to career.json and kariera's schema beside it, once both check out. */
export function syncCareerExport(source: CareerExportSource, siteRoot: string): void {
  const { careerJson, schemaJson } = exportOrRefuse(source);
  writeWhole(join(siteRoot, CAREER_SCHEMA_FILE), schemaJson);
  writeWhole(join(siteRoot, CAREER_DATA_FILE), careerJson);
}

/** Kariera's stderr goes straight to the terminal, so its reason for refusing shows. */
function karieraExportJson(): string {
  return execFileSync("kariera", ["export", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
}

export const careerExportStep: CareerSyncStep = {
  description: "export the career data from the vault with kariera",
  run: () => {
    syncCareerExport({ json: karieraExportJson, schemaFile: KARIERA_SCHEMA_FILE }, process.cwd());
  },
};
