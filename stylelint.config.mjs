/** Raw values for these properties are allowed only in the design-token file. */
const TOKENIZED_PROPERTIES = [
  "/color$/",
  "fill",
  "stroke",
  "font-family",
  "/^(margin|padding|inset)/",
  "/gap$/",
  "transition-duration",
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

/** Near-zero motion: no animations or fades, only color transitions with a token duration. */
const ALLOWED_TRANSITION_PROPERTIES = [
  "color",
  "background-color",
  "border-color",
  "outline-color",
  "text-decoration-color",
];

const TOKEN_FILE = "src/styles/tokens.css";

export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
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
    "property-disallowed-list": ["/^animation/", "transition"],
    "declaration-property-value-allowed-list": {
      "transition-property": ALLOWED_TRANSITION_PROPERTIES,
    },
  },
  overrides: [
    { files: ["**/*.astro"], customSyntax: "postcss-html" },
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
