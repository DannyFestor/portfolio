import { join } from "node:path";
import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";
import type { Plugin } from "vite-plus";

import { readDesignTokens, TOKEN_FILE } from "../design-tokens/design-tokens.ts";
import { screentoneSettings } from "./screentone-settings.ts";
import { screentoneStylesheet } from "./screentone-stylesheet.ts";

const STYLESHEET_ID = "virtual:screentone-tiles.css";

/** The `\0` prefix keeps other plugins from treating the virtual module as a file on disk. */
const RESOLVED_STYLESHEET_ID = `\0${STYLESHEET_ID}`;

/** Serves the tone tiles, generated from the design tokens, as a virtual stylesheet. */
function screentoneTilesPlugin(rootDirectory: string): Plugin {
  return {
    name: "screentone-tiles",
    resolveId(id) {
      return id === STYLESHEET_ID ? RESOLVED_STYLESHEET_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_STYLESHEET_ID) {
        return null;
      }
      this.addWatchFile(join(rootDirectory, TOKEN_FILE));
      return screentoneStylesheet(screentoneSettings(readDesignTokens(rootDirectory)));
    },
  };
}

/**
 * Generates the screentone tiles from src/styles/tokens.css and adds them to every page, so the
 * token file stays the one source of the tone colour, opacity, pitch and dot radii.
 */
export function screentone(): AstroIntegration {
  return {
    name: "screentone",
    hooks: {
      "astro:config:setup": ({ config, updateConfig, injectScript }) => {
        updateConfig({ vite: { plugins: [screentoneTilesPlugin(fileURLToPath(config.root))] } });
        injectScript("page-ssr", `import "${STYLESHEET_ID}";`);
      },
    },
  };
}
