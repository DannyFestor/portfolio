// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { halftone } from "./integrations/halftone/halftone-integration.ts";
import { screentone } from "./integrations/screentone/screentone-integration.ts";
import { SITE_URL } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [halftone(), screentone(), mdx(), sitemap()],
});
