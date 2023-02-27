/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    test: {
        globals: true,
        includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
        coverage: {
            include: ['src/**/*.{js,ts,jsx,tsx}'],
            all: true,
            reporter: ['text'],
        },
        typecheck: {
            include: ['src/**/*.{js,ts,jsx,tsx}'],
            exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
        },
    },
    define: {
        vitest: undefined,
    },
});
