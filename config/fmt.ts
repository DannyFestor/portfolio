import type { OxfmtConfig } from "vite-plus/fmt";

export const fmtConfig: OxfmtConfig = {
  // career.json and its schema are kariera's output, kept byte for byte so a sync shows only real changes.
  ignorePatterns: [
    "dist/**",
    ".astro/**",
    "pnpm-lock.yaml",
    "src/data/career.json",
    "src/data/career-export.schema.json",
    // Blog posts are prose with code samples as their author wrote them; formatting would rewrite both.
    "src/content/blog/**",
  ],
  astro: true,
  sortImports: true,
  sortPackageJson: true,
  jsdoc: true,
  printWidth: 100,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",
  insertFinalNewline: true,
  singleAttributePerLine: true,
  quoteProps: "consistent",
};
