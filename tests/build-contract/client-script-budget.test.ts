import { describe, expect, it } from "vite-plus/test";

import { builtFileSize, findBuiltFiles, readBuiltFile } from "./built-site.ts";

/**
 * Bytes of client JavaScript the whole site may ship. Danny sets the real number once the design
 * concept locks.
 */
const CLIENT_SCRIPT_BUDGET_BYTES = 0;

const INLINE_SCRIPT = /<script\b(?![^>]*application\/ld\+json)[^>]*>(?<body>[\s\S]*?)<\/script>/gu;

function inlineScriptBytes(page: string): number {
  const bodies = [...readBuiltFile(page).matchAll(INLINE_SCRIPT)].map(
    (match) => match.groups?.["body"] ?? "",
  );
  return bodies.reduce((total, body) => total + Buffer.byteLength(body), 0);
}

function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

describe("client JavaScript", () => {
  it(`stays within ${String(CLIENT_SCRIPT_BUDGET_BYTES)} bytes`, () => {
    const bundled = sum(findBuiltFiles("**/*.js").map((file) => builtFileSize(file)));
    const inline = sum(findBuiltFiles("**/*.html").map((page) => inlineScriptBytes(page)));
    expect(bundled + inline).toBeLessThanOrEqual(CLIENT_SCRIPT_BUDGET_BYTES);
  });
});
