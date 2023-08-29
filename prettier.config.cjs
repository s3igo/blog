/** @type {import("prettier").Config} */
module.exports = {
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
