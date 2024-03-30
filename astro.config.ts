import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import colors from 'tailwindcss/colors';
import { externalLinks, stripLineBreaks } from './plugins/remark';

const site = import.meta.env.PROD
    ? 'https://blog.tsuki-yo.net'
    : 'http://localhost:4321';

const textBg = (theme: string) =>
    theme === 'material-theme'
        ? colors.gray[950] // black-knight
        : colors.white;

// https://astro.build/config
export default defineConfig({
    site,
    trailingSlash: 'never', // to match the DEV and PROD environment
    prefetch: {
        prefetchAll: true,
    },
    markdown: {
        remarkPlugins: [stripLineBreaks, externalLinks(site)],
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
    },
    integrations: [
        solidJs(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        icon({
            include: {
                'line-md': ['rotate-270', 'hash-small'],
            },
        }),
        partytown(),
        expressiveCode({
            themes: ['material-theme', 'material-theme-lighter'],
            useThemedScrollbars: false,
            styleOverrides: {
                borderRadius: '0.5rem', // rounded-lg
                codeBackground: ({ theme }) => textBg(theme.name),
                frames: {
                    editorActiveTabBackground: ({ theme }) =>
                        textBg(theme.name),
                    editorActiveTabBorderColor: ({ theme }) =>
                        textBg(theme.name),
                    editorTabBarBackground: ({ theme }) =>
                        theme.name === 'material-theme'
                            ? '#384B5A' // yamagami-blue
                            : colors.slate[200], // bellflower-blue
                    editorActiveTabIndicatorBottomColor: colors.cyan[500], // maldives
                    shadowColor: 'transparent',
                },
            },
        }),
    ],
});
