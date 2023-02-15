module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            background: '#011627',
            foreground: '#D6DEEB',
            primary: '#FFEB95',
            secondary: '#7fdbca',
            tertiary: '#82aaff',
            shadow: '#575656',
        },
        fontFamily: {
            sans: ['Nunito Sans', 'Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
            code: ['JetBrains Mono', 'BIZ UDGothic', 'monospace', 'sans-serif'],
        },
        extend: {
            screens: {
                xs: '375px',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
