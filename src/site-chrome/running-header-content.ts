import { SITE_PLACE } from "../consts.ts";
import { BUILD_YEAR } from "./build-year.ts";

/** The running header's issue line (#28): `Issue 2026 · Nagasaki, Japan`. */
export const ISSUE_LINE = `Issue ${String(BUILD_YEAR)} · ${SITE_PLACE}`;
