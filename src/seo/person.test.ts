import { describe, expect, it } from "vite-plus/test";

import { careerExportFixture } from "../career/test-support/career-fixtures.ts";
import { personNode } from "./person.ts";

const PROFILES = ["https://github.com/example", "https://linkedin.com/in/example"];

describe("the Person in the structured data (#20)", () => {
  const career = careerExportFixture({
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Japanese", level: null },
    ],
  });

  it("names the person, their languages and their profiles from the given facts", () => {
    expect(personNode(career, PROFILES)).toStrictEqual({
      "@type": "Person",
      "@id": "https://festor.info/#person",
      "name": "Example Person",
      "url": "https://festor.info/",
      "knowsLanguage": ["English", "Japanese"],
      "sameAs": PROFILES,
    });
  });
});
