import { describe, expect, expectTypeOf, it } from "vite-plus/test";

import type { ApprovedSfx } from "../lettering/sfx.ts";
import { careerFrom } from "./career.ts";
import type { ProjectExtras } from "./project-extras.ts";
import { featuredProjects } from "./project-extras.ts";
import { careerExportFixture, projectFixture } from "./test-support/career-fixtures.ts";

const OLDEST = projectFixture({ note: "Example - Oldest", start: "2019-01" });
const MIDDLE = projectFixture({ note: "Example - Middle", start: "2021-01" });
const NEWEST = projectFixture({ note: "Example - Newest", start: "2024-01" });

const career = careerFrom(careerExportFixture({ projects: [OLDEST, NEWEST, MIDDLE] }));

describe("featured projects", () => {
  it("are the projects whose extras feature them, newest first", () => {
    const extras = {
      [OLDEST.note]: { featured: true },
      [MIDDLE.note]: { track: "build" },
      [NEWEST.note]: { featured: true, track: "rescue" },
    } satisfies Record<string, ProjectExtras>;
    expect(featuredProjects(career.projects, extras)).toStrictEqual([NEWEST, OLDEST]);
  });

  it("are none while no extras feature a project", () => {
    expect(featuredProjects(career.projects, {})).toStrictEqual([]);
  });
});

describe("the extras type", () => {
  it("takes only SFX from the approved list", () => {
    expectTypeOf<ProjectExtras["sfx"]>().toEqualTypeOf<ApprovedSfx | undefined>();
    expectTypeOf<"ガーン">().not.toExtend<ProjectExtras["sfx"]>();
  });

  it("takes only the Rescue and Build tracks", () => {
    expectTypeOf<ProjectExtras["track"]>().toEqualTypeOf<"rescue" | "build" | undefined>();
  });
});
