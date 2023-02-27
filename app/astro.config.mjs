import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import nightOwl from 'night-owl/themes/Night Owl-color-theme.json';
import normalizeHeadings from 'remark-normalize-headings';
import { injectDefaultLayout } from './src/remarkPlugins/injectDefaultLayout';
import { injectPubDate } from './src/remarkPlugins/injectPubDate';
import { setPreview } from './src/remarkPlugins/setPreview';
import { setTitle } from './src/remarkPlugins/setTitle';
import { test } from './src/remarkPlugins/test';
import { validateFrontmatter } from './src/remarkPlugins/validateFrontmatter';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.tsuki-yo.net',
    markdown: {
        remarkPlugins: [
            normalizeHeadings,
            setTitle,
            setPreview,
            injectPubDate,
            injectDefaultLayout,
            test,
            validateFrontmatter,
        ],
        extendedDefaultPlugins: true,
        shikiConfig: {
            theme: nightOwl,
        },
    },
    integrations: [
        tailwind({
            // カスタムクラスに`:hover`などのバリアントを適用するために必要
            // ref: https://github.com/withastro/astro/issues/3844
            config: { applyBaseStyles: false },
        }),
    ],
});
