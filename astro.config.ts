import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import { remarkStripLineBreaks } from './remark-strip-line-breaks';

export default defineConfig({
    integrations: [
        tailwind({ applyBaseStyles: false }),
        solid(),
        compress(),
        sitemap(),
    ],
    markdown: {
        remarkPlugins: [remarkStripLineBreaks, 'remark-code-titles'],
        shikiConfig: {
            themes: {
                dark: 'material-theme',
                light: 'material-theme-lighter',
            },
        },
    },
    prefetch: { prefetchAll: true },
    site: 'https://blog.tsuki-yo.net',
});
