import { describe, expect, it } from "vite-plus/test";

import { contentsNumber, episodeTitle } from "./episode-number.ts";

const THIRD_EPISODE = 3;
const TWELFTH_EPISODE = 12;

describe("the episode number of a post (#16)", () => {
  it("reads 第N話 on the post's frontispiece", () => {
    expect(episodeTitle(THIRD_EPISODE)).toBe("第3話");
  });

  it("is two digits in the table of contents", () => {
    expect(contentsNumber(THIRD_EPISODE)).toBe("03");
    expect(contentsNumber(TWELFTH_EPISODE)).toBe("12");
  });
});
