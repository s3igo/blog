import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import nightOwl from 'night-owl/themes/Night Owl-color-theme.json';

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
        shikiConfig: {
            theme: nightOwl,
            wrap: true,
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
