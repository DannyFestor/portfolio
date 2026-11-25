import { readFileSync } from "node:fs";

import { describe, expect, it } from "vite-plus/test";

import { CAREER_DATA_FILE } from "../../scripts/career-sync/career-export-step.ts";
import { publishedRates } from "../build-contract/published-rates.ts";
import { otherLanguageFound } from "./language-text.ts";
import { personalDataFound } from "./personal-data.ts";
import { workingHoursFound } from "./working-hours.ts";

const careerJson = readFileSync(CAREER_DATA_FILE, "utf8");

/** Every string value, so each text is judged on its own. */
function stringsIn(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap((member) => stringsIn(member));
  }
  return [];
}

const careerTexts = stringsIn(JSON.parse(careerJson));

describe("career.json holds no private data (#13)", () => {
  it("has no phone number, no email but the two allowed and no personal label", () => {
    expect(personalDataFound(careerJson)).toStrictEqual([]);
  });

  it("publishes no rate", () => {
    expect(publishedRates(careerJson)).toStrictEqual([]);
  });

  it("publishes no working hours", () => {
    expect(workingHoursFound(careerJson)).toStrictEqual([]);
  });

  it("is English, with short Japanese glosses and German names at most", () => {
    expect(careerTexts.flatMap((text) => otherLanguageFound(text))).toStrictEqual([]);
  });
});
