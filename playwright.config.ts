import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'chromium',
            testDir: './tests/e2e',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            testDir: './tests/e2e',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            testDir: './tests/e2e',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'vrt',
            testMatch: '**/vrt.spec.ts',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    testDir: './tests',
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
