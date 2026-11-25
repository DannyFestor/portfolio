import type { Period, VaultNote } from "./career-export.ts";

/** Plain code-unit order, as kariera compares strings; `YYYY-MM` months sort correctly by it. */
function compareText(first: string, second: string): number {
  return Number(first > second) - Number(first < second);
}

/** A sorted copy: the latest start first, then by vault note name, as kariera orders its export. */
export function newestFirst<Item extends Period & VaultNote>(items: readonly Item[]): Item[] {
  return items.toSorted(
    (first, second) =>
      compareText(second.start, first.start) || compareText(first.note, second.note),
  );
}
