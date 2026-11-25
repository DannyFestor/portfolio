import { describe, expect, it } from "vite-plus/test";

import { workingHoursFound } from "./working-hours.ts";

describe("working hours", () => {
  it.each([
    "160h a month",
    "140-180h",
    "140–180 hours",
    "40 hrs a week",
    "8 hours a day",
    "月160時間",
  ])("are found in %s", (text) => {
    expect(workingHoursFound(text)).not.toStrictEqual([]);
  });

  it.each([
    "Worked on the PHP 8 upgrade",
    "Shipped within 24 sprints",
    "2018 — 20",
    "Team of 8",
    "HTTP/2 and h2c",
    "Hourly backups",
  ])("are not confused with %s", (text) => {
    expect(workingHoursFound(text)).toStrictEqual([]);
  });
});
