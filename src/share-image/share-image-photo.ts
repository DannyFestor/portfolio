import { join } from "node:path";

import { COARSE_SCREEN, MASK_SIZE } from "../../integrations/halftone/mask-plan.ts";
import { halftonePhotoLayer } from "./halftone-photo-layer.ts";
import type { FramedPhoto } from "./halftone-photo-layer.ts";
import { insideBorder } from "./share-image-layout.ts";
import type { SharePanels } from "./share-image-layout.ts";
import type { ShareImageStyle } from "./share-image-style.ts";

/**
 * Danny's photo. The crop keeps his face, from the hairline down, and the camera in his hands at
 * the photo's bottom edge; only the crown of his head is cut.
 */
const PHOTO: FramedPhoto = {
  path: "src/assets/photos/danny.webp",
  subject: { top: 0.23, bottom: 1 },
};

/**
 * The photo printed like the photo plate, through its coarse screen, in ink, filling the photo
 * panel inside its border: a PNG data URL for Satori.
 */
export async function sharePhotoUrl(
  rootDirectory: string,
  panels: SharePanels,
  style: ShareImageStyle,
): Promise<string> {
  const frame = insideBorder(panels.photo, style.panelLine);
  const photo = { ...PHOTO, path: join(rootDirectory, PHOTO.path) };
  const ink = { screen: COARSE_SCREEN, maskSize: MASK_SIZE, color: style.ink };
  const layer = await halftonePhotoLayer(photo, frame, ink);
  return `data:image/png;base64,${layer.toString("base64")}`;
}
