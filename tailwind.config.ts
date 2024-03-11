import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
    content: ['./src/**/*.{astro,tsx}'],
    darkMode: 'class',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: [require('@kobalte/tailwindcss')],
    theme: {
        colors: {
            'bellflower-blue': colors.slate[200],
            'black-knight': '#030712', // gray-950
            'blue-blouse': colors.slate[400],
            'dreamy-cloud': colors.gray[200],
            encore: colors.gray[500],
            maldives: colors.cyan[500],
            'midnight-express': colors.gray[800],
            'spiced-nectarine': colors.orange[300],
            transparent: 'transparent',
            white: colors.white,
            'yamagami-blue': '#384B5A',
        },
        fontFamily: {
            code: ['JetBrains Mono', 'monospace', 'sans-serif'],
            sans: ['Nunito Sans', 'Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
        },
    },
};

export default config;
