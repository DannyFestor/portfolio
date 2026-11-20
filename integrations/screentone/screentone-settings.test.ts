import { describe, expect, it } from "vite-plus/test";

import { parseDesignTokens } from "../design-tokens/design-tokens.ts";
import { screentoneSettings } from "./screentone-settings.ts";

const TOKENS = parseDesignTokens(`
  --color-tone: #2d4a7a;
  --tone-opacity: 0.85;
  --tone-pitch: 6px;
  --tone-dot-light: 0.65px;
  --tone-dot-mid: 0.85px;
  --tone-dot-dense: 1.05px;
  --tone-dot-deep: 1.3px;
`);

describe("screentone settings", () => {
  it("come from the design tokens", () => {
    expect(screentoneSettings(TOKENS)).toStrictEqual({
      color: "#2d4a7a",
      opacity: 0.85,
      pitch: 6,
      dotRadius: { light: 0.65, mid: 0.85, dense: 1.05, deep: 1.3 },
    });
  });
});
