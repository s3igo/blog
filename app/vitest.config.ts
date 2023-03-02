/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    test: {
        globals: true,
        includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
        coverage: {
            all: true,
            reporter: ['text', 'json'],
        },
        typecheck: {
            include: ['src/**/*.{js,ts,jsx,tsx}'],
            exclude: ['node_modules', 'dist', '.git', '.cache', '**/*.spec.{js,ts,jsx,tsx}'],
        },
        environment: 'jsdom',
        transformMode: {
            web: [/\.[jt]sx?$/],
        },
        deps: {
            inline: [/solid-js/, /solid-testing-library/],
        },
    },
    resolve: {
        conditions: ['development', 'browser'],
    },
    define: {
        vitest: undefined,
    },
});
