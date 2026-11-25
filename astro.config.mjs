// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { halftone } from "./integrations/halftone/halftone-integration.ts";
import { screentone } from "./integrations/screentone/screentone-integration.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://festor.info",
  integrations: [halftone(), screentone(), mdx(), sitemap()],
});
