/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

const defaultIncludes = ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'];
const defaultExcludes = [
    '**/node_modules/**',
    '**/dist/**',
    '**/cypress/**',
    '**/.{idea,git,cache,output,temp}/**',
    '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
];

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
        exclude: ['./.direnv/**', './tests/e2e/**', ...defaultExcludes],
        globals: true,
        includeSource: ['src/**/*.{js,ts,jsx,tsx}', ...defaultIncludes],
        testTransformMode: {
            web: ['/.[jt]sx?$/'],
        },
        typecheck: {
            include: ['src/**/*.{js,ts,jsx,tsx}'],
        },
    },
});
