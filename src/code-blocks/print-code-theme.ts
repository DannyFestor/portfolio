/**
 * The Shiki theme of code blocks (#16), inked from the design tokens like the rest of the print:
 * ink on paper, red keywords, indigo strings and constants, grey comments. Every colour is a
 * `var(--color-…)` reference, so code blocks follow tokens.css and hold no raw colour of their
 * own.
 */

/** A TextMate scope rule: the scopes it matches, and the colour it sets their text in. */
interface ScopeRule {
  readonly scope?: string[];
  readonly settings: { readonly foreground: string; readonly background?: string };
}

interface CodeTheme {
  readonly name: string;
  readonly type: "light";
  readonly colors: Readonly<Record<"editor.foreground" | "editor.background", string>>;
  readonly settings: ScopeRule[];
}

const INK = "var(--color-ink)";
const PAPER = "var(--color-paper)";
const RED = "var(--color-accent)";
const INDIGO = "var(--color-tone)";
const GREY = "var(--color-grey)";

function inked(foreground: string, scope: readonly string[]): ScopeRule {
  return { scope: [...scope], settings: { foreground } };
}

export const PRINT_CODE_THEME: CodeTheme = {
  name: "print",
  type: "light",
  colors: { "editor.foreground": INK, "editor.background": PAPER },
  settings: [
    { settings: { foreground: INK, background: PAPER } },
    inked(RED, ["keyword", "storage", "storage.type", "storage.modifier"]),
    // Operators read as punctuation, not as keywords: they stay ink.
    inked(INK, ["keyword.operator"]),
    inked(INDIGO, ["string", "constant"]),
    inked(GREY, ["comment", "punctuation.definition.comment"]),
  ],
};

/**
 * How Astro highlights code with the print theme. Shiki writes each token's colour as a custom
 * property, `--shiki-print`, instead of an inline colour (html-validate allows no inline styles);
 * src/styles/code-blocks.css paints the text with it. Code scrolls sideways, set in the
 * stylesheet.
 */
export const PRINT_CODE_HIGHLIGHTING = {
  themes: { print: PRINT_CODE_THEME },
  defaultColor: false,
  wrap: null,
} as const;
