import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import normalizeHeadings from "remark-normalize-headings";
import { setTitle } from "./src/utils/remarkPlugins/setTitle";
import { injectDefaultLayout } from "./src/utils/remarkPlugins/injectDefaultLayout";
import { validateFrontmatter } from "./src/utils/remarkPlugins/validateFrontmatter";

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [normalizeHeadings, setTitle, injectDefaultLayout, validateFrontmatter],
        extendedDefaultPlugins: true,
    },
    integrations: [tailwind()],
});
