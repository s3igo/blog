import esLint from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
    {
        rules: {
            ...esLint.configs['recommended'].rules,
            ...prettier.rules,
        },
    },
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            ...ts.configs['recommended'].rules,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
    },
    {
        files: ['src/domain/**/*.ts'],
        rules: {
            'no-redeclare': 'off',
        },
    },
    {
        files: ['src/**/*.tsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['src/**/*.astro'],
        plugins: {
            astro,
        },
        rules: {
            ...astro.configs['recommended'].rules,
        },
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                extraFileExtensions: ['.astro'],
                parser: tsParser,
            },
            globals: {
                ...globals.node,
            },
        },
    },
];
