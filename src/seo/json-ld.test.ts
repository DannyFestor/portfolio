import { describe, expect, it } from "vite-plus/test";

import { jsonLd } from "./json-ld.ts";

describe("JSON-LD (#20)", () => {
  it("puts the nodes in one schema.org graph", () => {
    expect(JSON.parse(jsonLd([{ "@type": "Person", "name": "Ada" }]))).toStrictEqual({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "Person", "name": "Ada" }],
    });
  });

  it("cannot close the script element it is written into", () => {
    expect(jsonLd([{ "@type": "Thing", "name": "</script><script>" }])).not.toContain("<");
  });
});
