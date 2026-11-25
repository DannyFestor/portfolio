import { describe, expect, it } from "vite-plus/test";

import { careerFrom } from "../career/career.ts";
import type { ProjectExtrasByNote } from "../career/project-extras.ts";
import {
  careerExportFixture,
  engagementFixture,
  projectFixture,
} from "../career/test-support/career-fixtures.ts";
import { workPanels } from "./work-panels.ts";

const AGENCY = engagementFixture({
  note: "2024-01 Example Agency",
  organization: "Example Agency",
});
const PLANT = engagementFixture({ note: "2018-01 Example Plant", organization: "Example Plant" });

const PLATFORM = projectFixture({
  note: "Example Agency - Platform",
  engagement: AGENCY.note,
  title: "Example platform",
  start: "2024-01",
  end: null,
  role: "Backend lead",
  team_size: 6,
  industry: "B2B SaaS",
});
const VISION = projectFixture({
  note: "Example Plant - Vision",
  engagement: PLANT.note,
  title: "Example vision system",
  start: "2018-01",
  end: "2020-04",
  role: "Data analyst",
  team_size: null,
  industry: "Manufacturing",
});
const NOT_FEATURED = projectFixture({ note: "Example Agency - Side", engagement: AGENCY.note });

const career = careerFrom(
  careerExportFixture({ engagements: [AGENCY, PLANT], projects: [VISION, NOT_FEATURED, PLATFORM] }),
);

const EXTRAS: ProjectExtrasByNote = {
  [VISION.note]: { featured: true, impactLine: "Finds defects." },
  [PLATFORM.note]: { featured: true, track: "rescue", impactLine: "Seconds to milliseconds." },
  [NOT_FEATURED.note]: { impactLine: "Not on Home." },
};

describe("Home's work panels (#15)", () => {
  it("tell the featured projects, newest first, from career.json and their extras", () => {
    expect(workPanels(career, EXTRAS)).toStrictEqual([
      {
        note: PLATFORM.note,
        period: "2024 — now",
        title: "Example platform",
        client: "Example Agency · B2B SaaS",
        beat: "Backend lead, team of 6",
        impact: "Seconds to milliseconds.",
      },
      {
        note: VISION.note,
        period: "2018 — 20",
        title: "Example vision system",
        client: "Example Plant · Manufacturing",
        beat: "Data analyst",
        impact: "Finds defects.",
      },
    ]);
  });

  it("fail the build when a featured project has no impact line", () => {
    const extras: ProjectExtrasByNote = { [PLATFORM.note]: { featured: true } };
    expect(() => workPanels(career, extras)).toThrow(PLATFORM.note);
  });
});
