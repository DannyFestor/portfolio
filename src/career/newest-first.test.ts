import { describe, expect, it } from "vite-plus/test";

import { newestFirst } from "./newest-first.ts";
import { projectFixture } from "./test-support/career-fixtures.ts";

function notesOf(projects: readonly { readonly note: string }[]): string[] {
  return projects.map(({ note }) => note);
}

describe("newest first", () => {
  it("puts the latest start first", () => {
    const projects = [
      projectFixture({ note: "A - Old", start: "2018-10" }),
      projectFixture({ note: "B - New", start: "2025-06" }),
      projectFixture({ note: "C - Middle", start: "2021-02" }),
    ];
    expect(notesOf(newestFirst(projects))).toStrictEqual(["B - New", "C - Middle", "A - Old"]);
  });

  it("compares months, not only years", () => {
    const projects = [
      projectFixture({ note: "A - January", start: "2023-01" }),
      projectFixture({ note: "B - November", start: "2023-11" }),
    ];
    expect(notesOf(newestFirst(projects))).toStrictEqual(["B - November", "A - January"]);
  });

  it("orders the same start by note name", () => {
    const projects = [
      projectFixture({ note: "Example - Survey", start: "2023-06" }),
      projectFixture({ note: "Example - Pharmacy", start: "2023-06" }),
    ];
    expect(notesOf(newestFirst(projects))).toStrictEqual([
      "Example - Pharmacy",
      "Example - Survey",
    ]);
  });

  it("leaves the input as it was", () => {
    const projects = [
      projectFixture({ note: "A - Old", start: "2018-10" }),
      projectFixture({ note: "B - New", start: "2025-06" }),
    ];
    newestFirst(projects);
    expect(notesOf(projects)).toStrictEqual(["A - Old", "B - New"]);
  });
});
