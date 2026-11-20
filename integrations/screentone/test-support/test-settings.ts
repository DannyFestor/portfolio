import type { ScreentoneSettings } from "../screentone-settings.ts";

/** Different from the token values on purpose: the generator must not depend on them. */
export const TEST_SETTINGS: ScreentoneSettings = {
  color: "#123456",
  opacity: 0.5,
  pitch: 10,
  dotRadius: { light: 1, mid: 1.5, dense: 2, deep: 2.5 },
};
