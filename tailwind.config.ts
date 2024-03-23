import type { Config } from 'tailwindcss';
import { colorLiterals } from './styles/colors';

const config: Config = {
    content: ['./src/**/*.{astro,tsx}'],
    darkMode: 'class',
    theme: {
        colors: colorLiterals,
        fontFamily: {
            code: ['JetBrains Mono', 'monospace', 'sans-serif'],
            sans: ['Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
        },
    },
};

export default config;
