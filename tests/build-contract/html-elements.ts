import { decodeNumericCharacterReferences } from "./character-references.ts";

/** An element in built HTML: the attributes of its opening tag and the text right after it. */
export interface HtmlElement {
  readonly attributes: string;
  readonly text: string;
}

const OPENING_TAG_AND_TEXT = /<[a-z][a-z\d-]*(?<attributes>\s[^>]*)?>(?<text>[^<]*)/giu;
const ATTRIBUTE = /(?<name>[\w-]+)="(?<value>[^"]*)"/gu;
const WHITESPACE = /\s+/u;

function htmlElementsIn(html: string): HtmlElement[] {
  return [...decodeNumericCharacterReferences(html).matchAll(OPENING_TAG_AND_TEXT)].map(
    (match) => ({
      attributes: match.groups?.["attributes"] ?? "",
      text: (match.groups?.["text"] ?? "").trim(),
    }),
  );
}

export function attributeValue({ attributes }: HtmlElement, name: string): string | undefined {
  return [...attributes.matchAll(ATTRIBUTE)].find((match) => match.groups?.["name"] === name)
    ?.groups?.["value"];
}

export function hasClass(element: HtmlElement, className: string): boolean {
  return (attributeValue(element, "class") ?? "").split(WHITESPACE).includes(className);
}

export function isAriaHidden(element: HtmlElement): boolean {
  return attributeValue(element, "aria-hidden") === "true";
}

/** Every element carrying the class, with its text as a reader would see it. */
export function elementsWithClass(html: string, className: string): HtmlElement[] {
  return htmlElementsIn(html).filter((element) => hasClass(element, className));
}

/** Every element whose attribute has exactly this value. */
export function elementsWithAttribute(html: string, name: string, value: string): HtmlElement[] {
  return htmlElementsIn(html).filter((element) => attributeValue(element, name) === value);
}
