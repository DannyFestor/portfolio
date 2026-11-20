import { readFileSync } from "node:fs";

const TOKEN_FILE = "src/styles/tokens.css";

const CUSTOM_PROPERTY = /(?<name>--[\w-]+)\s*:\s*(?<value>[^;]+);/gu;

function readTokens(): ReadonlyMap<string, string> {
  const css = readFileSync(TOKEN_FILE, "utf8");
  return new Map(
    [...css.matchAll(CUSTOM_PROPERTY)].map((match) => [
      match.groups?.["name"] ?? "",
      (match.groups?.["value"] ?? "").trim(),
    ]),
  );
}

const tokens = readTokens();

/** The raw value of a custom property declared in the design-token file. */
export function tokenValue(name: string): string {
  const value = tokens.get(name);
  if (value === undefined) {
    throw new Error(`${TOKEN_FILE} declares no ${name}.`);
  }
  return value;
}
