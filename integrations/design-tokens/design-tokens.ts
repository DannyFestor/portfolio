import { readFileSync } from "node:fs";
import { join } from "node:path";

/** The design-token file, relative to the project root. */
export const TOKEN_FILE = "src/styles/tokens.css";

/** The custom properties declared in the design-token file: raw values by name. */
export type DesignTokens = Readonly<Record<string, string>>;

const CUSTOM_PROPERTY = /(?<name>--[\w-]+)\s*:\s*(?<value>[^;]+);/gu;
const PLAIN_NUMBER = /^\d+(?:\.\d+)?$/u;
const PIXEL_LENGTH = /^(?<amount>\d+(?:\.\d+)?)px$/u;

export function parseDesignTokens(css: string): DesignTokens {
  return Object.fromEntries(
    [...css.matchAll(CUSTOM_PROPERTY)].map((match) => [
      match.groups?.["name"] ?? "",
      (match.groups?.["value"] ?? "").trim(),
    ]),
  );
}

export function readDesignTokens(rootDirectory: string): DesignTokens {
  return parseDesignTokens(readFileSync(join(rootDirectory, TOKEN_FILE), "utf8"));
}

/** The raw value, as written in the token file. */
export function tokenValue(tokens: DesignTokens, name: string): string {
  const value = tokens[name];
  if (value === undefined) {
    throw new Error(`${TOKEN_FILE} declares no ${name}.`);
  }
  return value;
}

/** A plain number without a unit, such as an opacity. */
export function tokenNumber(tokens: DesignTokens, name: string): number {
  const value = tokenValue(tokens, name);
  if (!PLAIN_NUMBER.test(value)) {
    throw new Error(`${name} in ${TOKEN_FILE} is ${value}, not a plain number.`);
  }
  return Number(value);
}

/** A length in CSS pixels. */
export function tokenPixels(tokens: DesignTokens, name: string): number {
  const value = tokenValue(tokens, name);
  const amount = PIXEL_LENGTH.exec(value)?.groups?.["amount"];
  if (amount === undefined) {
    throw new Error(`${name} in ${TOKEN_FILE} is ${value}, not a length in px.`);
  }
  return Number(amount);
}
