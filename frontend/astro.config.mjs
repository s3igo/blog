import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import normalizeHeadings from "remark-normalize-headings";
import { setTitle } from "./src/remarkPlugins/setTitle";
import { setDescription } from "./src/remarkPlugins/setDescription";
import { injectDefaultLayout } from "./src/remarkPlugins/injectDefaultLayout";
import { validateFrontmatter } from "./src/remarkPlugins/validateFrontmatter";
import nightOwl from "night-owl/themes/Night Owl-color-theme.json";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.tsuki-yo.net",
    markdown: {
        remarkPlugins: [
            normalizeHeadings,
            setTitle,
            setDescription,
            injectDefaultLayout,
            validateFrontmatter,
        ],
        extendedDefaultPlugins: true,
        shikiConfig: {
            theme: nightOwl,
        },
    },
    integrations: [tailwind()],
});
