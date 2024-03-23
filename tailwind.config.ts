import type { Config } from 'tailwindcss';
import { literals } from './styles/colors';

const config: Config = {
    content: ['./src/**/*.{astro,tsx}'],
    darkMode: 'class',
    theme: {
        colors: literals,
        fontFamily: {
            code: ['JetBrains Mono', 'monospace', 'sans-serif'],
            sans: ['Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
        },
    },
};

export default config;
