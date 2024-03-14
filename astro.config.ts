import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import qwikdev from '@qwikdev/astro';
import { remarkStripLineBreaks } from './remark-strip-line-breaks';

export default defineConfig({
    integrations: [
        qwikdev(),
        tailwind({
            applyBaseStyles: false,
        }),
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
