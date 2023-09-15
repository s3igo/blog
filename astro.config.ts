import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

export default defineConfig({
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        solid(),
        compress(),
        sitemap(),
        prefetch(),
    ],
    markdown: {
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            theme: 'material-theme',
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
