import { siteUrlOf } from "../../src/seo/site-url.ts";
import { urlPathOfPage } from "./built-site.ts";
import { decodeNumericCharacterReferences } from "./character-references.ts";
import { attributeValue, elementsWithAttribute } from "./html-elements.ts";

const TITLE = /<title>(?<title>[^<]*)<\/title>/u;

/** The page's <title>, as a reader would see it. */
export function pageTitle(html: string): string | undefined {
  const title = TITLE.exec(html)?.groups?.["title"];
  return title === undefined ? undefined : decodeNumericCharacterReferences(title);
}

export function canonicalUrl(html: string): string | undefined {
  const [canonical] = elementsWithAttribute(html, "rel", "canonical");
  return canonical === undefined ? undefined : attributeValue(canonical, "href");
}

/** The content of the page's <meta> keyed by `property` (Open Graph) or `name` (the rest). */
export function metaContent(
  html: string,
  key: "property" | "name",
  value: string,
): string | undefined {
  const [meta] = elementsWithAttribute(html, key, value);
  return meta === undefined ? undefined : attributeValue(meta, "content");
}

/** A built page's own URL on the production origin: about/index.html to https://festor.info/about/. */
export function ownUrlOf(page: string): string {
  return siteUrlOf(urlPathOfPage(page));
}
