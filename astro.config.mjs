// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { halftone } from "./integrations/halftone/halftone-integration.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://festor.info",
  integrations: [halftone(), mdx(), sitemap()],
});
