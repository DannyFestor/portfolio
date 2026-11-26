/**
 * The structured data the pages describe (#20): Danny as a Person on Home and About, and his
 * freelance business as an Organization on Home. The languages come from career.json, the services
 * are Home's two worlds, the profiles are the back cover's.
 */
import { CAREER } from "../career/career-data.ts";
import { CONTACT_EMAIL, SITE_AUTHOR } from "../consts.ts";
import { WORLDS } from "../home/home-content.ts";
import { PROFILE_LINKS } from "../site-chrome/back-cover-content.ts";
import type { JsonLdNode } from "./json-ld.ts";
import { organizationNode } from "./organization.ts";
import { PERSON_ID, personNode } from "./person.ts";

const PERSON = personNode({
  name: SITE_AUTHOR,
  languages: CAREER.languages,
  profileUrls: PROFILE_LINKS.map(({ href }) => href),
  services: WORLDS.map(({ title, body }) => ({ name: title, description: body })),
});

const ORGANIZATION = organizationNode({
  name: SITE_AUTHOR,
  email: CONTACT_EMAIL,
  founderId: PERSON_ID,
});

export const HOME_STRUCTURED_DATA: readonly JsonLdNode[] = [PERSON, ORGANIZATION];

export const ABOUT_STRUCTURED_DATA: readonly JsonLdNode[] = [PERSON];
