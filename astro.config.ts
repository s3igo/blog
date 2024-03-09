import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

export default defineConfig({
    prefetch: {
        prefetchAll: true,
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        solid(),
        compress(),
        sitemap(),
    ],
    markdown: {
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            theme: 'material-theme',
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
