/**
 * Danny's freelance business as a schema.org Organization (#20), described on Home: its name, its
 * email and its founder. It has no logo yet.
 */
import { COVER_HREF } from "../site-chrome/chapters.ts";
import type { JsonLdNode } from "./json-ld.ts";
import { siteUrlOf } from "./site-url.ts";

const ORGANIZATION_ID = siteUrlOf("/#organization");

export interface OrganizationFacts {
  readonly name: string;
  readonly email: string;
  /** The node id of the Person who founded it. */
  readonly founderId: string;
}

export function organizationNode({ name, email, founderId }: OrganizationFacts): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name,
    "url": siteUrlOf(COVER_HREF),
    email,
    "founder": { "@id": founderId },
  };
}
