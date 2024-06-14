import { test as base } from '@playwright/test';

export type TestOptions = {
    mode: 'light' | 'dark';
};

export const test = base.extend<TestOptions>({
    mode: ['light', { option: true }],
});
