import { expect } from "vite-plus/test";

/** Asserts that every value is larger than the one before it. */
export function expectStrictlyRising(values: readonly number[]): void {
  expect(values).toStrictEqual(values.toSorted((first, second) => first - second));
  expect(new Set(values).size).toBe(values.length);
}
