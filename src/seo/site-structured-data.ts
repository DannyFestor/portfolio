/** The structured data the pages describe (#20): Danny as a Person on Home and About. */
import { CAREER } from "../career/career-data.ts";
import { PROFILE_LINKS } from "../site-chrome/back-cover-content.ts";
import type { JsonLdNode } from "./json-ld.ts";
import { personNode } from "./person.ts";

const PERSON = personNode(
  CAREER,
  PROFILE_LINKS.map(({ href }) => href),
);

export const HOME_STRUCTURED_DATA: readonly JsonLdNode[] = [PERSON];

export const ABOUT_STRUCTURED_DATA: readonly JsonLdNode[] = [PERSON];
