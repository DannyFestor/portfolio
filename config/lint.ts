import type { OxlintConfig, OxlintOverride } from "vite-plus/lint";

const sizeLimits = {
  "max-lines-per-function": ["error", { max: 30, skipBlankLines: true, skipComments: true }],
  "max-lines": ["error", { max: 200, skipBlankLines: true, skipComments: true }],
  "max-params": ["error", { max: 3 }],
  "max-depth": ["error", { max: 2 }],
  "max-statements": ["error", { max: 10 }],
  "complexity": ["error", { max: 6 }],
  "max-nested-callbacks": ["error", { max: 2 }],
} satisfies OxlintConfig["rules"];

const typeSafety = {
  "typescript/no-explicit-any": "error",
  "typescript/no-non-null-assertion": "error",
  "typescript/no-unsafe-assignment": "error",
  "typescript/no-unsafe-member-access": "error",
  "typescript/no-unsafe-call": "error",
  "typescript/no-unsafe-return": "error",
  "typescript/no-floating-promises": "error",
  "typescript/no-misused-promises": "error",
  "typescript/switch-exhaustiveness-check": "error",
  "typescript/strict-boolean-expressions": "error",
  "typescript/no-unnecessary-condition": "error",
  "typescript/no-unnecessary-type-assertion": "error",
  "typescript/restrict-template-expressions": "error",
  "typescript/prefer-nullish-coalescing": "error",
  "typescript/explicit-function-return-type": "error",
  "typescript/explicit-module-boundary-types": "error",
  "typescript/consistent-type-imports": "error",
  "typescript/ban-ts-comment": [
    "error",
    { "ts-check": false, "ts-expect-error": true, "ts-ignore": true, "ts-nocheck": true },
  ],
} satisfies OxlintConfig["rules"];

const structure = {
  "import/no-cycle": "error",
  "import/no-default-export": "error",
  // Stylesheets are imported for their side effect: Astro bundles them into the page.
  "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
  "unicorn/filename-case": ["error", { case: "kebabCase" }],
  "no-param-reassign": ["error", { props: true }],
  "no-nested-ternary": "error",
  "no-magic-numbers": [
    "error",
    {
      ignore: [-1, 0, 1],
      ignoreArrayIndexes: true,
      ignoreDefaultValues: true,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
      enforceConst: true,
    },
  ],
  "id-length": ["error", { min: 2, exceptions: ["_"] }],
} satisfies OxlintConfig["rules"];

const modernSyntax = {
  "no-var": "error",
  "prefer-const": "error",
  "eqeqeq": "error",
} satisfies OxlintConfig["rules"];

const pedanticTuning = {
  // Callback parameters typed by a library (a lint rule context) and browser handles cannot be made readonly.
  "typescript/prefer-readonly-parameter-types": [
    "error",
    {
      ignoreInferredTypes: true,
      allow: [
        {
          from: "package",
          package: "playwright-core",
          name: ["Browser", "BrowserContext", "Page"],
        },
      ],
    },
  ],
} satisfies OxlintConfig["rules"];

const guardrails = {
  "guardrails/no-disable-comments": "error",
  "vite-plus/prefer-vite-plus-imports": "error",
} satisfies OxlintConfig["rules"];

const filesThatMustDefaultExport: OxlintOverride = {
  files: [
    "vite.config.ts",
    "astro.config.mjs",
    "stylelint.config.mjs",
    "lint/guardrails-plugin.ts",
  ],
  rules: { "import/no-default-export": "off" },
};

const sizeLimitedTestFiles: OxlintOverride = {
  files: ["**/*.test.ts"],
  rules: { "max-lines-per-function": "off", "max-nested-callbacks": "off" },
};

export const lintConfig: OxlintConfig = {
  ignorePatterns: ["dist/**", ".astro/**"],
  plugins: ["eslint", "typescript", "unicorn", "import", "oxc", "promise", "jsx-a11y"],
  jsPlugins: [
    { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
    "./lint/guardrails-plugin.ts",
  ],
  categories: { correctness: "error", suspicious: "error", pedantic: "error", perf: "error" },
  options: {
    typeAware: true,
    typeCheck: true,
    denyWarnings: true,
    reportUnusedDisableDirectives: "error",
    respectEslintDisableDirectives: false,
  },
  rules: {
    ...sizeLimits,
    ...typeSafety,
    ...structure,
    ...modernSyntax,
    ...pedanticTuning,
    ...guardrails,
  },
  overrides: [filesThatMustDefaultExport, sizeLimitedTestFiles],
};
