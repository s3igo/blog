import partytown from '@astrojs/partytown';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import colors from 'tailwindcss/colors';
import arraybuffer from 'vite-plugin-arraybuffer';
import { externalLinks, stripLineBreaks } from './plugins/remark.ts';

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
        svelte(),
        partytown(),
        expressiveCode({
            themes: ['material-theme', 'material-theme-lighter'],
            themeCssSelector: ({ type }) => `[data-theme='${type}']`,
            useDarkModeMediaQuery: false,
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
                            ? colors.slate[800]
                            : colors.slate[100],
                    editorActiveTabIndicatorBottomColor: colors.cyan[500], // maldives
                    shadowColor: 'transparent',
                },
            },
        }),
    ],
    vite: {
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                targets: browserslistToTargets(browserslist('defaults')),
            },
        },
        build: {
            cssMinify: 'lightningcss',
        },
        plugins: [
            tailwindcss(),
            // https://github.com/tachibana-shin/vite-plugin-arraybuffer
            // https://github.com/vitejs/vite/issues/12366 が解決されたら不要になる
            arraybuffer(),
        ],
    },
    experimental: {
        svg: true,
    },
});
