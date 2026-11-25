/**
 * The site's extras per project, keyed by vault note name (see src/career/project-extras.ts).
 * Impact lines marked draft ship as draft and are replaced at content time.
 */
import type { ProjectExtrasByNote } from "../career/project-extras.ts";

export const PROJECT_EXTRAS: ProjectExtrasByNote = {
  "Lazuli - PDP": {
    featured: true,
    // draft
    impactLine: "Asset versioning: snapshots, history and restore for every file.",
  },
  "Qualita - Investment Marketplace": {
    featured: true,
    track: "rescue",
    sfx: "シュッ",
    // draft
    impactLine: "One index: seconds → milliseconds.",
  },
  "Sony Semiconductor Manufacturing - Wafer Defect Detection": {
    featured: true,
    track: "build",
    // draft
    impactLine: "Computer vision that finds defects on semiconductor wafers.",
  },
};
