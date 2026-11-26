import { decodeNumericCharacterReferences } from "./character-references.ts";

/** An element in built HTML: the attributes of its opening tag and the text right after it. */
export interface HtmlElement {
  readonly attributes: string;
  readonly text: string;
}

const OPENING_TAG_AND_TEXT = /<[a-z][a-z\d-]*(?<attributes>\s[^>]*)?>(?<text>[^<]*)/giu;
const ATTRIBUTE = /(?<name>[\w-]+)="(?<value>[^"]*)"/gu;
const WHITESPACE = /\s+/u;
const WHITESPACE_RUNS = /\s+/gu;
const MAIN_CONTENT = /<main\b[^>]*>(?<content>[\s\S]*?)<\/main>/u;
const TAG = /<[^>]+>/gu;

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

/**
 * Whether the element carries the attribute, valued or bare: `crossorigin` and `crossorigin=""`
 * both do.
 */
export function hasAttribute(element: HtmlElement, name: string): boolean {
  const bareAttributes = element.attributes.replaceAll(ATTRIBUTE, " ").split(WHITESPACE);
  return attributeValue(element, name) !== undefined || bareAttributes.includes(name);
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

/** The markup inside the page's <main>. */
export function mainHtml(html: string): string {
  return MAIN_CONTENT.exec(html)?.groups?.["content"] ?? "";
}

/** The markup outside the page's <main>: the site chrome. */
export function chromeHtml(html: string): string {
  return html.replace(MAIN_CONTENT, "");
}

/** The text of the page's <main>, tags dropped and whitespace collapsed, as a reader would see it. */
export function mainText(html: string): string {
  return decodeNumericCharacterReferences(mainHtml(html).replaceAll(TAG, " "))
    .replaceAll(WHITESPACE_RUNS, " ")
    .trim();
}
