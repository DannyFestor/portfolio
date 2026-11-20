import type { OxfmtConfig } from "vite-plus/fmt";

export const fmtConfig: OxfmtConfig = {
  ignorePatterns: ["dist/**", ".astro/**", "pnpm-lock.yaml"],
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
