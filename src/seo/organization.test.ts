import { describe, expect, it } from "vite-plus/test";

import { organizationNode } from "./organization.ts";

describe("the Organization in the structured data (#20)", () => {
  it("names the business, its email and its founder", () => {
    expect(
      organizationNode({
        name: "Ada Lovelace",
        email: "ada@example.com",
        founderId: "https://festor.info/#person",
      }),
    ).toStrictEqual({
      "@type": "Organization",
      "@id": "https://festor.info/#organization",
      "name": "Ada Lovelace",
      "url": "https://festor.info/",
      "email": "ada@example.com",
      "founder": { "@id": "https://festor.info/#person" },
    });
  });
});
