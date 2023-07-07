import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind({
            // カスタムクラスに`:hover`などのバリアントを適用するために必要
            // ref: https://github.com/withastro/astro/issues/3844
            config: {
                applyBaseStyles: false,
            },
        }),
        solidJs(),
    ],
    markdown: {
        extendedDefaultPlugins: true,
        remarkPlugins: ['remark-code-titles'],
        shikiConfig: {
            theme: 'material-theme-ocean',
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
