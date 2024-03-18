import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { externalLinks, stripLineBreaks } from './plugins/remark';

const site = 'https://blog.tsuki-yo.net';

// https://astro.build/config
export default defineConfig({
    integrations: [
        solidJs(),
        tailwind({
            applyBaseStyles: false,
        }),
        compress(),
        sitemap(),
        icon({
            include: {
                'line-md': ['rotate-270', 'hash-small'],
            },
        }),
    ],
    markdown: {
        remarkPlugins: [
            stripLineBreaks,
            externalLinks(site),
            'remark-code-titles',
        ],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'wrap',
                    properties: {
                        class: 'anchor',
                    },
                },
            ],
        ],
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
    site,
});
