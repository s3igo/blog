/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    define: {
        vitest: undefined,
    },
    resolve: {
        conditions: ['development', 'browser'],
    },
    test: {
        coverage: {
            all: true,
            reporter: ['text', 'json'],
        },
        deps: {
            inline: [/solid-js/, /solid-testing-library/],
        },
        environment: 'jsdom',
        exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
        globals: true,
        includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
        setupFiles: ['./vitest.setup.ts'],
        transformMode: {
            web: [/\.[jt]sx?$/],
        },
        typecheck: {
            exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
            include: ['src/**/*.{js,ts,jsx,tsx}'],
        },
    },
});
