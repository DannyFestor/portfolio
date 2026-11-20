import { RuleTester } from "vite-plus/lint/plugins-dev";
import { describe, it } from "vite-plus/test";

import { noDisableComments } from "./no-disable-comments.ts";

RuleTester.describe = (name, suite): void => {
  describe(name, suite);
};
RuleTester.it = (name, test): void => {
  it(name, test);
};

const ruleTester = new RuleTester({ languageOptions: { parserOptions: { lang: "ts" } } });

function rejected(code: string, directive: string): RuleTester.InvalidTestCase {
  return { code, errors: [{ messageId: "noDisableComment", data: { directive } }] };
}

ruleTester.run("no-disable-comments", noDisableComments, {
  valid: [
    "// a plain explanatory comment\nexport const answer = 42;",
    "/* mentions oxlint-disable only in passing */\nexport const answer = 42;",
    "/** Docs about @ts-ignore usage elsewhere. */\nexport const answer = 42;",
  ],
  invalid: [
    rejected("// oxlint-disable-next-line no-var\nexport const a = 1;", "oxlint-disable-next-line"),
    rejected("/* oxlint-disable */\nexport const a = 1;", "oxlint-disable"),
    rejected("export const a = 1; // oxlint-disable-line", "oxlint-disable-line"),
    rejected("// eslint-disable-next-line no-var\nexport const a = 1;", "eslint-disable-next-line"),
    rejected("/* eslint-disable */\nexport const a = 1;", "eslint-disable"),
    rejected("// @ts-ignore\nexport const a: number = 1;", "@ts-ignore"),
    rejected("// @ts-expect-error\nexport const a: number = 1;", "@ts-expect-error"),
    rejected("// @ts-nocheck\nexport const a = 1;", "@ts-nocheck"),
    rejected("/**\n * @ts-ignore\n */\nexport const a = 1;", "@ts-ignore"),
  ],
});
