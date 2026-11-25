/** Raw values for these properties are allowed only in the design-token file. */
const TOKENIZED_PROPERTIES = [
  "/color$/",
  "fill",
  "stroke",
  "font-family",
  "/^(margin|padding|inset)/",
  "/gap$/",
];

const KEYWORD_VALUES = [
  "currentColor",
  "transparent",
  "inherit",
  "initial",
  "unset",
  "none",
  "auto",
  "0",
];

const COLOR_FUNCTIONS = [
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "color",
];

/** No motion: pages are static like print, so every state switches instantly. */
const MOTION_PROPERTIES = ["/^animation/", "/^transition/"];

/** Calls to action are inked links, never buttons (#27): no class may name a button. */
const CLASS_PATTERN = "^(?!(?:.*-)?(?:btn|button)(?:-|$))[a-z][a-z0-9]*(?:-[a-z0-9]+)*$";

/** Keyboard focus is never switched off. */
const FOCUS_RING_REMOVALS = {
  "outline": ["/^(?:none|0)(?:\\s|$)/"],
  "outline-style": ["none"],
  "outline-width": ["/^0(?:px)?$/"],
};

/** :focus-visible styles live in one stylesheet, so every link and control shows the same ring. */
const FOCUS_STYLESHEET = "src/styles/focus.css";

const TOKEN_FILE = "src/styles/tokens.css";

export default {
  // Recess order groups declarations: positioning, box model, typography, visual, misc.
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-declaration-strict-value"],
  // The build output is minified, not authored.
  ignoreFiles: ["dist/**"],
  // Disable comments have no effect: a guardrail cannot be switched off inline.
  ignoreDisables: true,
  rules: {
    "scale-unlimited/declaration-strict-value": [
      TOKENIZED_PROPERTIES,
      { ignoreValues: KEYWORD_VALUES, expandShorthand: true, disableFix: true },
    ],
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": COLOR_FUNCTIONS,
    "declaration-no-important": true,
    "selector-max-id": 0,
    "at-rule-disallowed-list": ["keyframes"],
    "property-disallowed-list": MOTION_PROPERTIES,
    "selector-class-pattern": [
      CLASS_PATTERN,
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case and not name a button`,
      },
    ],
    "declaration-property-value-disallowed-list": FOCUS_RING_REMOVALS,
    "selector-pseudo-class-disallowed-list": ["focus", "focus-visible"],
  },
  overrides: [
    { files: ["**/*.astro"], customSyntax: "postcss-html" },
    { files: [FOCUS_STYLESHEET], rules: { "selector-pseudo-class-disallowed-list": ["focus"] } },
    {
      files: [TOKEN_FILE],
      rules: {
        "scale-unlimited/declaration-strict-value": null,
        "color-no-hex": null,
        "function-disallowed-list": null,
      },
    },
  ],
};
