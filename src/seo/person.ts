/**
 * Danny as a schema.org Person (#20), described on Home and About: the name, the spoken languages,
 * the profiles and the services offered. schema.org gives a Person no `services`; a Person
 * `makesOffer` an Offer of each Service.
 */
import type { SpokenLanguage } from "../career/career-export.ts";
import { COVER_HREF } from "../site-chrome/chapters.ts";
import type { JsonLdNode } from "./json-ld.ts";
import { siteUrlOf } from "./site-url.ts";

/** The Person's node id: one Person, however many pages and nodes refer to it. */
export const PERSON_ID = siteUrlOf("/#person");

interface OfferedService {
  readonly name: string;
  readonly description: string;
}

export interface PersonFacts {
  readonly name: string;
  readonly languages: readonly SpokenLanguage[];
  readonly profileUrls: readonly string[];
  readonly services: readonly OfferedService[];
}

function offerOf({ name, description }: OfferedService): JsonLdNode {
  return { "@type": "Offer", "itemOffered": { "@type": "Service", name, description } };
}

export function personNode({ name, languages, profileUrls, services }: PersonFacts): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    "url": siteUrlOf(COVER_HREF),
    "knowsLanguage": languages.map((language) => language.name),
    "sameAs": profileUrls,
    "makesOffer": services.map((service) => offerOf(service)),
  };
}
