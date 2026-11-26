/**
 * Structured data for search engines (#20): schema.org nodes, written as one JSON-LD graph into a
 * <script type="application/ld+json"> in the page head.
 */
export interface JsonLdNode {
  readonly "@type": string;
  readonly [property: string]: unknown;
}

const SCHEMA_ORG = "https://schema.org";
const LESS_THAN = /</gu;
/** `<` as a JSON unicode escape: the same string to a JSON parser, no tag to an HTML parser. */
const ESCAPED_LESS_THAN = "\\u003c";

/** The graph as JSON, with `<` escaped so no value can end the script element early. */
export function jsonLd(nodes: readonly JsonLdNode[]): string {
  return JSON.stringify({ "@context": SCHEMA_ORG, "@graph": nodes }).replaceAll(
    LESS_THAN,
    ESCAPED_LESS_THAN,
  );
}
