import type { Config } from 'tailwindcss';
import { literals } from './styles/colors.ts';

export default {
    content: ['./src/**/*.{astro,tsx}'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        colors: literals,
        fontFamily: {
            code: ['JetBrains Mono', 'monospace', 'sans-serif'],
            sans: ['Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
        },
    },
} satisfies Config;
