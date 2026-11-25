/**
 * `vp run career:sync`: brings the career vault's public output into the site. Run locally only; CI
 * has no vault and never calls it. Each step is a CareerSyncStep; add new ones to the list.
 */
import { careerExportStep } from "./career-sync/career-export-step.ts";
import { runCareerSync } from "./career-sync/career-sync-step.ts";
import { publicResumesStep } from "./career-sync/public-resumes-step.ts";

runCareerSync([careerExportStep, publicResumesStep]);
