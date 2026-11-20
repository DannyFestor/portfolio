import { existsSync, globSync, statSync } from "node:fs";
import { join, posix } from "node:path";

export const BUILT_SITE_DIRECTORY = "dist";

function assertSiteIsBuilt(): void {
  if (!existsSync(BUILT_SITE_DIRECTORY)) {
    throw new Error(`No ${BUILT_SITE_DIRECTORY}/ found. Run \`vp run build\` before \`vp test\`.`);
  }
}

export function findBuiltFiles(pattern: string): string[] {
  assertSiteIsBuilt();
  return globSync(pattern, { cwd: BUILT_SITE_DIRECTORY }).toSorted();
}

export function builtFileSize(relativePath: string): number {
  return statSync(join(BUILT_SITE_DIRECTORY, relativePath)).size;
}

/** Maps `index.html` to `/` and `about/index.html` to `/about/`; other files keep their path. */
export function urlPathOfPage(relativePath: string): string {
  const path = `/${relativePath.split("\\").join(posix.sep)}`;
  return path.endsWith("/index.html") ? path.slice(0, -"index.html".length) : path;
}
