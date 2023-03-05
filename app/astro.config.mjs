import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import nightOwl from 'night-owl/themes/Night Owl-color-theme.json';
import { addARIA } from './src/rehypePlugins/toc';
import { injectDefaultLayout } from './src/remarkPlugins/injectDefaultLayout';
import { setPreview } from './src/remarkPlugins/setPreview';
import { setTitle } from './src/remarkPlugins/setTitle';
import { validateFrontmatter } from './src/remarkPlugins/validateFrontmatter';

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
        rehypePlugins: [
            'rehype-slug',
            'rehype-autolink-headings',
            ['rehype-toc', { customizeTOC: addARIA, headings: ['h2', 'h3', 'h4', 'h5', 'h6'] }],
        ],
        remarkPlugins: [
            'remark-normalize-headings',
            'remark-code-titles',
            setTitle,
            setPreview,
            injectDefaultLayout,
            validateFrontmatter,
        ],
        shikiConfig: {
            theme: nightOwl,
        },
    },
    site: 'https://blog.tsuki-yo.net',
});
