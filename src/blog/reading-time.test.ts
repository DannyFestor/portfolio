import { describe, expect, it } from "vite-plus/test";

import { readingMinutes, readingTimeLabel } from "./reading-time.ts";

const WORDS_PER_MINUTE = 220;
const THREE_MINUTES = 3;
const FOUR_MINUTES = 4;
const HALF_A_MINUTE = 110;

function words(count: number): string {
  return Array.from({ length: count }, () => "word").join(" ");
}

describe("the reading time of a post (#16)", () => {
  it("counts 220 words a minute", () => {
    expect(readingMinutes(words(THREE_MINUTES * WORDS_PER_MINUTE))).toBe(THREE_MINUTES);
  });

  it("rounds to the nearest minute", () => {
    const threeAndAHalfMinutes = THREE_MINUTES * WORDS_PER_MINUTE + HALF_A_MINUTE;
    expect(readingMinutes(words(threeAndAHalfMinutes - 1))).toBe(THREE_MINUTES);
    expect(readingMinutes(words(threeAndAHalfMinutes + 1))).toBe(FOUR_MINUTES);
  });

  it("splits words at any run of whitespace, line breaks and tabs included", () => {
    const minute = words(WORDS_PER_MINUTE);
    const text = `${minute}\n\n${minute}\t ${minute}`;
    expect(readingMinutes(text)).toBe(THREE_MINUTES);
  });

  it("is one minute at least, even for a short post", () => {
    expect(readingMinutes("Short.")).toBe(1);
  });

  it("is labelled in minutes", () => {
    expect(readingTimeLabel(FOUR_MINUTES)).toBe("4 min read");
  });
});
