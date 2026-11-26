import { describe, expect, it } from "vite-plus/test";

import { personNode } from "./person.ts";

const PROFILES = ["https://github.com/example", "https://linkedin.com/in/example"];

describe("the Person in the structured data (#20)", () => {
  it("names the person, their languages, profiles and services from the given facts", () => {
    expect(
      personNode({
        name: "Ada Lovelace",
        languages: [
          { name: "English", level: "Fluent" },
          { name: "Japanese", level: null },
        ],
        profileUrls: PROFILES,
        services: [{ name: "Analysis", description: "Reads the engine's programs." }],
      }),
    ).toStrictEqual({
      "@type": "Person",
      "@id": "https://festor.info/#person",
      "name": "Ada Lovelace",
      "url": "https://festor.info/",
      "knowsLanguage": ["English", "Japanese"],
      "sameAs": PROFILES,
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Analysis",
            "description": "Reads the engine's programs.",
          },
        },
      ],
    });
  });
});
