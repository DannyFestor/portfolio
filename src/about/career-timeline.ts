/**
 * The About page's career strip (#18): every engagement as one beat, read left to right, oldest
 * first. Engagements that ended before the move to Japan are early chapters; the current engagement
 * is drawn red.
 */
import type { Engagement } from "../career/career-export.ts";
import type { Career } from "../career/career.ts";
import { yearOf } from "../career/month.ts";
import { periodLabel } from "../career/period-label.ts";

type TimelineStage = "early-chapter" | "chapter" | "current";

/** What the strip reads from the career: the engagements, newest first, and the current one. */
export type CareerEngagements = Readonly<Pick<Career, "engagements" | "currentEngagement">>;

export interface TimelineBeat {
  readonly period: string;
  readonly organization: string;
  readonly role: string | null;
  readonly stage: TimelineStage;
}

function endedBefore(engagement: Engagement, year: number): boolean {
  return engagement.end !== null && yearOf(engagement.end) < year;
}

function stageOf(
  career: CareerEngagements,
  engagement: Engagement,
  movedToJapanIn: number,
): TimelineStage {
  if (engagement === career.currentEngagement) {
    return "current";
  }
  return endedBefore(engagement, movedToJapanIn) ? "early-chapter" : "chapter";
}

export function careerTimeline(career: CareerEngagements, movedToJapanIn: number): TimelineBeat[] {
  return career.engagements.toReversed().map((engagement) => ({
    period: periodLabel(engagement),
    organization: engagement.organization,
    role: engagement.role,
    stage: stageOf(career, engagement, movedToJapanIn),
  }));
}
