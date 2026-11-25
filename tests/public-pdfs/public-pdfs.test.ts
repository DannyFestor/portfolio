import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { personalDataFound } from "../privacy/personal-data.ts";
import { pdfText } from "./pdf-text.ts";
import { textPdf } from "./test-support/text-pdf.ts";

const PUBLIC_DIRECTORY = "public";

const publicPdfs = globSync("**/*.pdf", { cwd: PUBLIC_DIRECTORY }).toSorted();

async function personalDataInPdf(bytes: ArrayLike<number>): Promise<string[]> {
  return personalDataFound(await pdfText(bytes));
}

describe("PDFs in public/ hold no personal data (#14)", () => {
  it("include the résumés", () => {
    expect(publicPdfs.length).toBeGreaterThan(0);
  });

  it.each(publicPdfs)("%s", async (pdf) => {
    const bytes = readFileSync(join(PUBLIC_DIRECTORY, pdf));
    expect(await personalDataInPdf(bytes)).toStrictEqual([]);
  });

  it("are read closely enough to catch personal data planted in a PDF", async () => {
    const planted = textPdf([
      "Danny Festor, Software Engineer",
      "Date of birth: 1 January 1990",
      "Phone: +81 90-1234-5678",
      "Write to someone@example.com",
      "Nationality: German",
      "Home address: 1-2-3 Example Street",
    ]);
    expect(await personalDataInPdf(planted)).toStrictEqual([
      "phone number",
      "email other than the two allowed",
      "birth-date label",
      "address label",
      "nationality label",
    ]);
  });
});
