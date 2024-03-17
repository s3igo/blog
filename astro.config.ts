import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import qwikdev from '@qwikdev/astro';
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
        qwikdev(),
        tailwind({ applyBaseStyles: false }),
        compress(),
        sitemap(),
        icon({ include: { gg: ['dark-mode'], lucide: ['rss'] } }),
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
                    properties: { class: 'anchor' },
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
    prefetch: { prefetchAll: true },
    site,
});
