import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkNormalizeHeadings from "remark-normalize-headings";
import { remarkGetTitle } from "./src/plugins/remark-get-title";

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [remarkNormalizeHeadings, remarkGetTitle],
        extendedDefaultPlugins: true,
    },
    integrations: [tailwind()],
});
