/**
 * Rebuilds public/fonts from src/fonts/font-subsets.ts: downloads each source TTF and its OFL
 * license from google/fonts at the pinned commit, and subsets the TTF to woff2 with pyftsubset.
 *
 * Needs uv (https://docs.astral.sh/uv/), which fetches the pinned Python and fontTools; the project
 * itself stays free of Python. Run it with `vp run fonts:subset`.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import {
  FONT_FAMILIES,
  fontFileUrl,
  GOOGLE_FONTS_COMMIT,
  LATIN_UNICODE_RANGES,
  licenseFileUrl,
} from "../src/fonts/font-subsets.ts";
import type { FontFaceSource, FontFamilySubset } from "../src/fonts/font-subsets.ts";

const PUBLIC_DIRECTORY = "public";
const FONTS_DIRECTORY = join(PUBLIC_DIRECTORY, "fonts");
const GOOGLE_FONTS_RAW = `https://raw.githubusercontent.com/google/fonts/${GOOGLE_FONTS_COMMIT}`;
const PYFTSUBSET = ["--python", "3.13", "--from", "fonttools[woff]==4.68.0", "pyftsubset"];

async function downloadFromGoogleFonts(path: string): Promise<Buffer> {
  const response = await fetch(`${GOOGLE_FONTS_RAW}/${path}`);
  if (!response.ok) {
    throw new Error(
      `Downloading ${path} from google/fonts failed: HTTP ${String(response.status)}.`,
    );
  }
  return Buffer.from(await response.arrayBuffer());
}

function publicPath(urlPath: string): string {
  const path = join(PUBLIC_DIRECTORY, urlPath);
  mkdirSync(dirname(path), { recursive: true });
  return path;
}

function subsetToWoff2(sourcePath: string, outputPath: string, japaneseText: string): void {
  execFileSync(
    "uvx",
    [
      ...PYFTSUBSET,
      sourcePath,
      `--unicodes=${LATIN_UNICODE_RANGES.join(",")}`,
      `--text=${japaneseText}`,
      "--flavor=woff2",
      `--output-file=${outputPath}`,
    ],
    { stdio: "inherit" },
  );
}

async function shipFace(
  family: FontFamilySubset,
  face: FontFaceSource,
  workDirectory: string,
): Promise<void> {
  const sourcePath = join(workDirectory, face.sourceFile);
  writeFileSync(
    sourcePath,
    await downloadFromGoogleFonts(`${family.googleFontsDirectory}/${face.sourceFile}`),
  );
  const outputPath = publicPath(fontFileUrl(family, face));
  subsetToWoff2(sourcePath, outputPath, family.japaneseText.join(""));
}

async function shipLicense(family: FontFamilySubset): Promise<void> {
  const license = await downloadFromGoogleFonts(`${family.googleFontsDirectory}/OFL.txt`);
  writeFileSync(publicPath(licenseFileUrl(family)), license);
}

async function shipFamily(family: FontFamilySubset, workDirectory: string): Promise<void> {
  await shipLicense(family);
  await Promise.all(family.faces.map((face) => shipFace(family, face, workDirectory)));
}

const workDirectory = mkdtempSync(join(tmpdir(), "subset-fonts-"));
try {
  rmSync(FONTS_DIRECTORY, { recursive: true, force: true });
  await Promise.all(FONT_FAMILIES.map((family) => shipFamily(family, workDirectory)));
} finally {
  rmSync(workDirectory, { recursive: true, force: true });
}
