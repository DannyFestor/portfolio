/**
 * Danny as a schema.org Person (#20), described on Home and About: the name and the spoken
 * languages from career.json, the profiles linked from the back cover.
 */
import type { CareerExport } from "../career/career-export.ts";
import { COVER_HREF } from "../site-chrome/chapters.ts";
import type { JsonLdNode } from "./json-ld.ts";
import { siteUrlOf } from "./site-url.ts";

/** The Person's node id: one Person, however many pages describe it. */
const PERSON_ID = siteUrlOf("/#person");

type PersonFacts = Pick<CareerExport, "profile" | "languages">;

export function personNode(
  { profile, languages }: PersonFacts,
  profileUrls: readonly string[],
): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    "name": profile.name,
    "url": siteUrlOf(COVER_HREF),
    "knowsLanguage": languages.map(({ name }) => name),
    "sameAs": profileUrls,
  };
}
