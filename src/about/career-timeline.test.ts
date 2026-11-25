import { describe, expect, it } from "vite-plus/test";

import { careerFrom } from "../career/career.ts";
import { careerExportFixture, engagementFixture } from "../career/test-support/career-fixtures.ts";
import { careerTimeline } from "./career-timeline.ts";

const MOVED_TO_JAPAN_IN = 2017;

const FIRST_JOB = engagementFixture({
  note: "2009-10 First Job",
  organization: "First Job",
  role: "Translator",
  start: "2009-10",
  end: "2010-08",
});
const INTERNSHIP = engagementFixture({
  note: "2015-09 Internship",
  organization: "Internship",
  role: null,
  start: "2015-09",
  end: "2016-03",
});
const ENDED_AFTER_MOVE = engagementFixture({
  note: "2016-10 Lab",
  organization: "Lab",
  role: "Engineer",
  start: "2016-10",
  end: "2017-03",
});
const CURRENT = engagementFixture({
  note: "2025-06 Client",
  organization: "Client",
  role: "Backend engineer",
  start: "2025-06",
  end: null,
});

const timeline = careerTimeline(
  careerFrom(
    careerExportFixture({ engagements: [CURRENT, INTERNSHIP, ENDED_AFTER_MOVE, FIRST_JOB] }),
  ),
  MOVED_TO_JAPAN_IN,
);

describe("the career timeline strip (#18)", () => {
  it("reads oldest first, left to right", () => {
    expect(timeline.map(({ organization }) => organization)).toStrictEqual([
      "First Job",
      "Internship",
      "Lab",
      "Client",
    ]);
  });

  it("labels each engagement with its period and role", () => {
    expect(timeline[0]).toMatchObject({ period: "2009 — 10", role: "Translator" });
    expect(timeline[1]?.role).toBeNull();
  });

  it("makes engagements that ended before the move to Japan early chapters", () => {
    expect(timeline.map(({ stage }) => stage)).toStrictEqual([
      "early-chapter",
      "early-chapter",
      "chapter",
      "current",
    ]);
  });

  it("marks no engagement current when every engagement has ended", () => {
    const ended = careerTimeline(
      careerFrom(careerExportFixture({ engagements: [FIRST_JOB, ENDED_AFTER_MOVE] })),
      MOVED_TO_JAPAN_IN,
    );
    expect(ended.map(({ stage }) => stage)).toStrictEqual(["early-chapter", "chapter"]);
  });
});
