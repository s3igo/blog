import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import normalizeHeadings from "remark-normalize-headings";
import { setTitle } from "./src/remarkPlugins/setTitle";
import { injectDefaultLayout } from "./src/remarkPlugins/injectDefaultLayout";
import { validateFrontmatter } from "./src/remarkPlugins/validateFrontmatter";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.tsuki-yo.net",
    markdown: {
        remarkPlugins: [normalizeHeadings, setTitle, injectDefaultLayout, validateFrontmatter],
        extendedDefaultPlugins: true,
    },
    integrations: [tailwind()],
});
