import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './tests/vrt/index.ts';

export default defineConfig<TestOptions>({
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        // VRT
        {
            name: 'vrt-light',
            testDir: './tests/vrt',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'vrt-dark',
            testDir: './tests/vrt',
            use: {
                ...devices['Desktop Chrome'],
                mode: 'dark',
                colorScheme: 'dark',
            },
        },
    ],
    testDir: './tests/e2e',
    use: {
        baseURL: 'http://localhost:4321',
    },
    webServer: {
        command: 'bun run preview',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        url: 'http://localhost:4321',
    },
});
