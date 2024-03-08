/** @type {import("prettier").Config} */
export default {
    singleQuote: true,
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
};
