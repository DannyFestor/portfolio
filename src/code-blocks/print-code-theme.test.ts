import { describe, expect, it } from "vite-plus/test";

import { readDesignTokens } from "../../integrations/design-tokens/design-tokens.ts";
import { PRINT_CODE_HIGHLIGHTING, PRINT_CODE_THEME } from "./print-code-theme.ts";

const tokens = readDesignTokens(process.cwd());
const TOKEN_REFERENCE = /^var\((?<name>--[\w-]+)\)$/u;

function colorOfScope(scope: string): string | undefined {
  return PRINT_CODE_THEME.settings.find((rule) => rule.scope?.includes(scope) === true)?.settings
    .foreground;
}

function referencedToken(color: string): string | undefined {
  return TOKEN_REFERENCE.exec(color)?.groups?.["name"];
}

const themeColors = [
  ...Object.values(PRINT_CODE_THEME.colors),
  ...PRINT_CODE_THEME.settings.flatMap(({ settings }) => Object.values(settings)),
];

describe("the print code theme (#16)", () => {
  it("sets code in ink on paper", () => {
    expect(PRINT_CODE_THEME.colors).toStrictEqual({
      "editor.foreground": "var(--color-ink)",
      "editor.background": "var(--color-paper)",
    });
  });

  it.each([
    ["keyword", "var(--color-accent)"],
    ["storage.type", "var(--color-accent)"],
    ["string", "var(--color-tone)"],
    ["constant", "var(--color-tone)"],
    ["comment", "var(--color-grey)"],
    ["keyword.operator", "var(--color-ink)"],
  ])("inks %s in %s", (scope, color) => {
    expect(colorOfScope(scope)).toBe(color);
  });

  it.each(themeColors)("takes %s from the design tokens", (color) => {
    expect(Object.keys(tokens)).toContain(referencedToken(color));
  });
});

describe("code highlighting with the print theme (#16)", () => {
  it("writes token colours as the --shiki-print custom property, never inline", () => {
    expect(PRINT_CODE_HIGHLIGHTING.themes).toStrictEqual({ print: PRINT_CODE_THEME });
    expect(PRINT_CODE_HIGHLIGHTING.defaultColor).toBe(false);
  });

  it("leaves sideways scrolling to the stylesheet", () => {
    expect(PRINT_CODE_HIGHLIGHTING.wrap).toBeNull();
  });
});
