import { SFX_CLASS } from "../../src/lettering/sfx.ts";
import { decodeNumericCharacterReferences } from "./character-references.ts";

/** An SFX element in built HTML: the attributes of its opening tag and its text. */
export interface SfxElement {
  readonly attributes: string;
  readonly text: string;
}

const OPENING_TAG_AND_TEXT = /<[a-z][a-z\d-]*(?<attributes>\s[^>]*)?>(?<text>[^<]*)/giu;
const CLASS_ATTRIBUTE = /\bclass="(?<classes>[^"]*)"/u;
const ARIA_HIDDEN = /\baria-hidden="true"/u;
const WHITESPACE = /\s+/u;

function hasSfxClass({ attributes }: SfxElement): boolean {
  const classes = CLASS_ATTRIBUTE.exec(attributes)?.groups?.["classes"] ?? "";
  return classes.split(WHITESPACE).includes(SFX_CLASS);
}

/** Every element carrying the SFX class, with its text as a reader would see it. */
export function sfxElementsIn(html: string): SfxElement[] {
  return [...decodeNumericCharacterReferences(html).matchAll(OPENING_TAG_AND_TEXT)]
    .map((match) => ({
      attributes: match.groups?.["attributes"] ?? "",
      text: (match.groups?.["text"] ?? "").trim(),
    }))
    .filter((element) => hasSfxClass(element));
}

export function isAriaHidden({ attributes }: SfxElement): boolean {
  return ARIA_HIDDEN.test(attributes);
}
