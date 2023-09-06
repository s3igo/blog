import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        solid(),
        compress(),
    ],
    markdown: {
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            theme: 'material-theme',
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
