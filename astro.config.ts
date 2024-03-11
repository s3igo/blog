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
    ],
    markdown: {
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            themes: {
                dark: 'material-theme',
                light: 'material-theme-lighter',
            },
        },
    },
    prefetch: {
        prefetchAll: true,
    },
    site: 'https://blog.tsuki-yo.net',
});
