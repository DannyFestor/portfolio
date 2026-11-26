/**
 * The share image's copy (#20): what link previews show for every page. The lettering is Danny's
 * name and the positioning line (#6), both locked, each set in the face Home sets it in. The
 * alternative text is draft and is replaced at content time.
 */
import { PORTRAIT_ALT, POSITIONING_BEATS, POSITIONING_LINE, SITE_AUTHOR } from "../consts.ts";
import { SHARE_IMAGE_FACES } from "../fonts/font-subsets.ts";
import type { FamilyFace } from "../fonts/font-subsets.ts";

/** A line of the share image's lettering and the face it is set in. */
export interface LetteredLine {
  readonly text: string;
  readonly face: FamilyFace;
}

export const SHARE_IMAGE_LETTERING = {
  name: { text: SITE_AUTHOR, face: SHARE_IMAGE_FACES.display },
  quietBeat: { text: POSITIONING_BEATS.quiet, face: SHARE_IMAGE_FACES.narration },
  impactBeat: { text: POSITIONING_BEATS.impact, face: SHARE_IMAGE_FACES.display },
} as const satisfies Readonly<Record<string, LetteredLine>>;

// draft
export const SHARE_IMAGE_ALT = `${PORTRAIT_ALT}, printed in halftone beside the line “${POSITIONING_LINE}”`;
