import { describe, expect, it } from "vite-plus/test";

import { engagementFixture } from "../career/test-support/career-fixtures.ts";
import { freelanceSince } from "./freelance-since.ts";

const FIRST_FREELANCE_YEAR = 2020;

describe("freelance since (#15)", () => {
  it("is the year of the first freelance or own-business engagement", () => {
    const engagements = [
      engagementFixture({ engagement_type: "freelance", start: "2024-05" }),
      engagementFixture({
        engagement_type: "own-business",
        start: `${String(FIRST_FREELANCE_YEAR)}-07`,
      }),
      engagementFixture({ engagement_type: "employment", start: "2018-10" }),
    ];
    expect(freelanceSince(engagements)).toBe(FIRST_FREELANCE_YEAR);
  });

  it("fails the build while no engagement is freelance", () => {
    const engagements = [engagementFixture({ engagement_type: "employment" })];
    expect(() => freelanceSince(engagements)).toThrow("freelance");
  });
});
