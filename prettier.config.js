/** @type {import("prettier").Config} */
export default {
    singleQuote: true,
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
                tabWidth: 4,
            },
        },
    ],
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
};
