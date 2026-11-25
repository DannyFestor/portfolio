import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { PUBLIC_RESUMES } from "../../src/career/public-resumes.ts";
import {
  CAREER_PUBLIC_FOLDER_VARIABLE,
  careerPublicFolder,
  copyPublicResumes,
} from "./public-resumes-step.ts";

let workDirectory = "";

function vaultFolder(name: string, fileNames: readonly string[]): string {
  const folder = join(workDirectory, "Generated", name);
  mkdirSync(folder, { recursive: true });
  for (const fileName of fileNames) {
    writeFileSync(join(folder, fileName), `contents of ${fileName}`);
  }
  return folder;
}

function siteFile(urlPath: string): string {
  return join(workDirectory, "site", "public", urlPath);
}

const RESUME_FILE_NAMES = PUBLIC_RESUMES.map((resume) => resume.vaultFileName);

beforeEach(() => {
  workDirectory = mkdtempSync(join(tmpdir(), "career-sync-"));
});

afterEach(() => {
  rmSync(workDirectory, { recursive: true, force: true });
});

describe("the career vault's public folder", () => {
  it(`comes from ${CAREER_PUBLIC_FOLDER_VARIABLE} when it is set`, () => {
    expect(careerPublicFolder({ [CAREER_PUBLIC_FOLDER_VARIABLE]: "/vault/public" })).toBe(
      "/vault/public",
    );
  });

  it("defaults to Danny's vault", () => {
    expect(careerPublicFolder({})).toMatch(/\/Generated\/public$/u);
  });
});

describe("copying the public résumés", () => {
  it("copies each résumé to its URL under public/", () => {
    copyPublicResumes(vaultFolder("public", RESUME_FILE_NAMES), join(workDirectory, "site"));
    expect(
      PUBLIC_RESUMES.map(({ urlPath }) => readFileSync(siteFile(urlPath), "utf8")),
    ).toStrictEqual(RESUME_FILE_NAMES.map((fileName) => `contents of ${fileName}`));
  });

  it("refuses any folder but the public one, where the private résumés live", () => {
    const privateFolder = join(vaultFolder("public", []), "..");
    expect(() => {
      copyPublicResumes(privateFolder, join(workDirectory, "site"));
    }).toThrow(/is not the vault's public folder/u);
  });

  it("fails clearly on a machine without the vault", () => {
    expect(() => {
      copyPublicResumes(join(workDirectory, "public"), join(workDirectory, "site"));
    }).toThrow(/does not exist on this machine/u);
  });

  it("copies nothing when a résumé is missing", () => {
    const folder = vaultFolder("public", RESUME_FILE_NAMES.slice(0, 1));
    expect(() => {
      copyPublicResumes(folder, join(workDirectory, "site"));
    }).toThrow(/is missing from/u);
    expect(PUBLIC_RESUMES.some(({ urlPath }) => existsSync(siteFile(urlPath)))).toBe(false);
  });
});
