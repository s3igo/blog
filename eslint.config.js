import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import esLintImport from 'eslint-plugin-import';
import globals from 'globals';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/*.d.ts'],
        plugins: {
            '@typescript-eslint': ts,
            import: esLintImport,
            'sort-destructure-keys': sortDestructureKeys,
        },
        rules: {
            ...ts.configs['strict-type-checked'].rules,
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { fixStyle: 'inline-type-imports' },
            ],
            'sort-keys': ['error', 'asc', { natural: true }],
            'import/first': 'error',
            'import/order': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': ['error', { 'prefer-inline': true }],
            'sort-destructure-keys/sort-destructure-keys': 'error',
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
    prettier,
];
