import { defineConfig } from "vite-plus";

import { fmtConfig } from "./config/fmt.ts";
import { lintConfig } from "./config/lint.ts";

// Task commands stay inline: knip reads them from this file to find the tools they use.
export default defineConfig({
  staged: {
    "*": "vp check --fix",
    "*.{css,astro}": "stylelint --fix",
  },
  fmt: fmtConfig,
  lint: lintConfig,
  run: {
    tasks: {
      "fonts:subset": { command: "vpx scripts/subset-fonts.ts" },
      "career:sync": { command: "vpx scripts/career-sync.ts", cache: false },
      // Generates the astro:content types into .astro/, so the type-aware lint sees real collection types.
      "sync:types": { command: "astro sync" },
      "check:astro": { command: "astro check" },
      "check:css": { command: 'stylelint "**/*.{css,astro}"' },
      "check:unused": { command: "knip" },
      "check:duplicates": { command: "jscpd ." },
      "check:spelling": { command: "git ls-files | cspell --no-progress --dot --file-list stdin" },
      "check:disable-comments": { command: "scripts/refuse-disable-comments.sh" },
      "check:html": { command: 'html-validate "dist/**/*.html"' },
      "check:links": {
        command:
          'scripts/run-pinned.sh lychee --offline --no-progress --index-files index.html --root-dir dist "dist/**/*.html"',
      },
      "check:all": {
        command: [
          "vp run sync:types",
          "vp check",
          "vp run check:astro",
          "vp run check:css",
          "vp run check:unused",
          "vp run check:duplicates",
          "vp run check:spelling",
          "vp run check:disable-comments",
          "vp run build",
          "vp test",
          "vp run check:html",
          "vp run check:links",
        ],
      },
    },
  },
});
