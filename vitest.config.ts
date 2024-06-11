/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

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
            include: ['src/**'],
            reporter: ['text', 'json'],
        },
        exclude: [...configDefaults.exclude, './.direnv/**', './tests/e2e/**'],
        globals: true,
        includeSource: [...configDefaults.include, 'src/**/*.{js,ts,jsx,tsx}'],
        testTransformMode: {
            web: ['/.[jt]sx?$/'],
        },
        typecheck: {
            include: ['src/**/*.{js,ts,jsx,tsx}'],
        },
    },
});
