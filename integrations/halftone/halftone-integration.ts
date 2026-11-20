import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";

import { halftoneMask } from "./halftone-mask.ts";
import { MASK_DIRECTORY, MASK_SIZE, planHalftoneMasks } from "./mask-plan.ts";
import type { PlannedMask } from "./mask-plan.ts";

async function renderMask(mask: PlannedMask): Promise<void> {
  await writeFile(mask.maskPath, await halftoneMask(mask.photoPath, MASK_SIZE, mask.screen));
}

/** Rebuilds the mask folder from scratch, so masks of removed photos never linger. */
async function renderMasks(rootDirectory: string, masks: readonly PlannedMask[]): Promise<void> {
  const maskDirectory = join(rootDirectory, MASK_DIRECTORY);
  await rm(maskDirectory, { recursive: true, force: true });
  await mkdir(maskDirectory, { recursive: true });
  await Promise.all(masks.map((mask) => renderMask(mask)));
}

function photoPathsOf(masks: readonly PlannedMask[]): string[] {
  return [...new Set(masks.map((mask) => mask.photoPath))];
}

/**
 * Screens every photo in `src/assets/photos` into halftone masks before Astro resolves any import,
 * for `astro dev`, `astro build` and `astro sync`. A changed photo restarts the dev server, which
 * renders the masks again.
 */
export function halftone(): AstroIntegration {
  return {
    name: "halftone",
    hooks: {
      "astro:config:setup": async ({ command, config, addWatchFile, logger }) => {
        if (command === "preview") {
          return;
        }
        const rootDirectory = fileURLToPath(config.root);
        const masks = planHalftoneMasks(rootDirectory);
        await renderMasks(rootDirectory, masks);
        photoPathsOf(masks).forEach((photoPath) => {
          addWatchFile(photoPath);
        });
        logger.info(`Rendered ${String(masks.length)} halftone masks into ${MASK_DIRECTORY}/.`);
      },
    },
  };
}
