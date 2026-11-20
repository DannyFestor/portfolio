import { defineConfig } from "vite-plus";

import { fmtConfig } from "./config/fmt.ts";
import { lintConfig } from "./config/lint.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: fmtConfig,
  lint: lintConfig,
});
