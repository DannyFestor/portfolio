import { describe, expect, it } from "vite-plus/test";

import { careerFrom } from "./career.ts";
import {
  careerExportFixture,
  engagementFixture,
  projectFixture,
} from "./test-support/career-fixtures.ts";

const OLD_JOB = engagementFixture({ note: "2018-10 Old Job", start: "2018-10", end: "2020-04" });
const FREELANCE = engagementFixture({ note: "2020-07 Freelance", start: "2020-07", end: null });
const CURRENT_CLIENT = engagementFixture({ note: "2025-06 Client", start: "2025-06", end: null });

const OLD_PROJECT = projectFixture({ note: "Old Job - Tool", start: "2018-10" });
const NEW_PROJECT = projectFixture({ note: "Client - Platform", start: "2025-06" });

const career = careerFrom(
  careerExportFixture({
    engagements: [OLD_JOB, CURRENT_CLIENT, FREELANCE],
    projects: [OLD_PROJECT, NEW_PROJECT],
  }),
);

describe("the career loader", () => {
  it("refuses data that does not follow the schema", () => {
    expect(() => careerFrom({ schema_version: 1 })).toThrow(/does not follow the kept/u);
  });

  it("lists engagements newest first", () => {
    expect(career.engagements).toStrictEqual([CURRENT_CLIENT, FREELANCE, OLD_JOB]);
  });

  it("lists projects newest first", () => {
    expect(career.projects).toStrictEqual([NEW_PROJECT, OLD_PROJECT]);
  });

  it("looks up an engagement by its note name", () => {
    expect(career.engagement("2020-07 Freelance")).toStrictEqual(FREELANCE);
  });

  it("looks up a project by its note name", () => {
    expect(career.project("Old Job - Tool")).toStrictEqual(OLD_PROJECT);
  });

  it("fails the build on a note name it does not know", () => {
    expect(() => career.project("Renamed - Tool")).toThrow(/Renamed - Tool/u);
  });

  it("takes the newest running engagement as the current one", () => {
    expect(career.currentEngagement).toStrictEqual(CURRENT_CLIENT);
  });

  it("keeps the qualifications and languages in export order", () => {
    const degree = {
      name: "BSc Example",
      category: "degree",
      issuer: "Example University",
      start: "2012-10",
      date: "2016-11",
      level: null,
      score: null,
    } as const;
    const languages = [
      { name: "German", level: "Native" },
      { name: "English", level: null },
    ];
    const withProfile = careerFrom(careerExportFixture({ qualifications: [degree], languages }));
    expect(withProfile.qualifications).toStrictEqual([degree]);
    expect(withProfile.languages).toStrictEqual(languages);
  });

  it("has no current engagement when every engagement has ended", () => {
    const ended = careerFrom(careerExportFixture({ engagements: [OLD_JOB] }));
    expect(ended.currentEngagement).toBeUndefined();
  });
});
