import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig, squooshImageService } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import colors from 'tailwindcss/colors';
import { externalLinks, stripLineBreaks } from './plugins/remark';

const site = 'https://blog.tsuki-yo.net';

const textBg = (theme: string) =>
    theme === 'material-theme'
        ? colors.gray[950] // black-knight
        : colors.white;

// https://astro.build/config
export default defineConfig({
    image: {
        service: squooshImageService(),
    },
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
