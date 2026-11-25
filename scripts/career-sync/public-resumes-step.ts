import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";

import { PUBLIC_RESUMES } from "../../src/career/public-resumes.ts";
import type { PublicResume } from "../../src/career/public-resumes.ts";
import type { CareerSyncStep } from "./career-sync-step.ts";

/** Points the sync at the vault's public résumé folder on machines where it lives elsewhere. */
export const CAREER_PUBLIC_FOLDER_VARIABLE = "CAREER_PUBLIC_FOLDER";

const DEFAULT_CAREER_PUBLIC_FOLDER = "/Users/danny/Obsidian/default/06 - Work/Generated/public";

/** The folder that holds only the public résumés; its parent holds the private ones. */
const PUBLIC_FOLDER_NAME = "public";

type Environment = Readonly<Record<string, string | undefined>>;

export function careerPublicFolder(environment: Environment): string {
  return environment[CAREER_PUBLIC_FOLDER_VARIABLE] ?? DEFAULT_CAREER_PUBLIC_FOLDER;
}

function refuseNonPublicFolder(folder: string): void {
  if (basename(folder) !== PUBLIC_FOLDER_NAME) {
    throw new Error(
      `${folder} is not the vault's public folder. Set ${CAREER_PUBLIC_FOLDER_VARIABLE} to the folder named "${PUBLIC_FOLDER_NAME}"; its parent holds the private résumés.`,
    );
  }
}

function refuseMissingFolder(folder: string): void {
  if (!existsSync(folder)) {
    throw new Error(
      `The career vault's public folder ${folder} does not exist on this machine. Set ${CAREER_PUBLIC_FOLDER_VARIABLE} to its path.`,
    );
  }
}

function refuseMissingResume(folder: string, resume: PublicResume): void {
  if (!existsSync(join(folder, resume.vaultFileName))) {
    throw new Error(`${resume.vaultFileName} is missing from ${folder}.`);
  }
}

function copyResume(folder: string, resume: PublicResume, siteRoot: string): void {
  const target = join(siteRoot, "public", resume.urlPath);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(folder, resume.vaultFileName), target);
}

/** Copies every public résumé to its URL under public/, after checking all of them are there. */
export function copyPublicResumes(folder: string, siteRoot: string): void {
  refuseNonPublicFolder(folder);
  refuseMissingFolder(folder);
  for (const resume of PUBLIC_RESUMES) {
    refuseMissingResume(folder, resume);
  }
  for (const resume of PUBLIC_RESUMES) {
    copyResume(folder, resume, siteRoot);
  }
}

export const publicResumesStep: CareerSyncStep = {
  description: "copy the public résumés from the career vault",
  run: () => {
    copyPublicResumes(careerPublicFolder(process.env), process.cwd());
  },
};
