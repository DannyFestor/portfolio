import { describe, expect, it } from "vite-plus/test";

import { projectFixture } from "../career/test-support/career-fixtures.ts";
import { roleLine } from "./role-line.ts";

describe("the role line of a study", () => {
  it("gives the role and the team size", () => {
    expect(roleLine(projectFixture({ role: "Backend lead", team_size: 6 }))).toBe(
      "Backend lead · team of 6",
    );
  });

  it("gives the role alone when the team size is unknown", () => {
    expect(roleLine(projectFixture({ role: "Developer", team_size: null }))).toBe("Developer");
  });
});
