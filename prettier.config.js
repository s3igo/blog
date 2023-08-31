/** @type {import("prettier").Config} */
export default {
    jsonRecursiveSort: true,
    jsonSortOrder: 'lexical',
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    plugins: ['prettier-plugin-astro', 'prettier-plugin-sort-json', 'prettier-plugin-tailwindcss'],
    singleQuote: true,
};
