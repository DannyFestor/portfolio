import { describe, expect, it } from "vite-plus/test";

import { postDateLabel, postDateTime } from "./post-date.ts";

describe("the post date of a <time> element", () => {
  it("is the calendar day as YYYY-MM-DD", () => {
    expect(postDateTime(new Date("2024-04-17"))).toBe("2024-04-17");
  });
});

describe("the post date label (#25)", () => {
  it("reads day, month name and year", () => {
    expect(postDateLabel(new Date("2024-04-17"))).toBe("17 April 2024");
  });

  it("keeps the calendar day of the frontmatter date, whatever the build machine's time zone", () => {
    expect(postDateLabel(new Date("2024-03-01T00:00:00Z"))).toBe("1 March 2024");
  });
});
