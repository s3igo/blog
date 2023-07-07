module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    plugins: [require('@kobalte/tailwindcss')],
    theme: {
        extend: {
            colors: {
                background: '#011627',
                foreground: '#D6DEEB',
                primary: '#FFEB95',
                secondary: '#7fdbca',
                shadow: '#575656',
                tertiary: '#82aaff',
                transparent: 'transparent',
            },
            screens: {
                xs: '375px',
            },
        },
        fontFamily: {
            code: ['JetBrains Mono', 'BIZ UDGothic', 'monospace', 'sans-serif'],
            sans: ['Nunito Sans', 'Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
        },
    },
};
