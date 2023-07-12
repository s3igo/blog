import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind({ applyBaseStyles: false }), solidJs()],
    markdown: {
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            theme: 'material-theme',
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
