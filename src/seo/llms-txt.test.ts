import { describe, expect, it } from "vite-plus/test";

import { llmsTxt } from "./llms-txt.ts";

describe("the llms.txt format (#20, llmstxt.org)", () => {
  it("writes the title, the summary, the details and the link sections", () => {
    expect(
      llmsTxt({
        title: "Ada Lovelace",
        summary: "Writes the first program.",
        details: ["Works in English.", "Open for new projects."],
        sections: [
          {
            heading: "Pages",
            links: [
              { title: "Home", url: "https://example.com/", description: "The cover." },
              { title: "Notes", url: "https://example.com/notes/" },
            ],
          },
        ],
      }),
    ).toBe(
      [
        "# Ada Lovelace",
        "",
        "> Writes the first program.",
        "",
        "Works in English.",
        "",
        "Open for new projects.",
        "",
        "## Pages",
        "",
        "- [Home](https://example.com/): The cover.",
        "- [Notes](https://example.com/notes/)",
        "",
      ].join("\n"),
    );
  });
});
