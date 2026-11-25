import type { VaultNote } from "./career-export.ts";

/** Career items by their vault note name; an unknown name fails the build instead of a page. */
export class NotesByName<Item extends VaultNote> {
  readonly #items: ReadonlyMap<string, Item>;
  readonly #kind: string;

  constructor(kind: string, items: readonly Item[]) {
    this.#kind = kind;
    this.#items = new Map(items.map((item) => [item.note, item]));
  }

  has(note: string): boolean {
    return this.#items.has(note);
  }

  get(note: string): Item {
    const item = this.#items.get(note);
    if (item === undefined) {
      throw new Error(`career.json has no ${this.#kind} note named "${note}".`);
    }
    return item;
  }
}
