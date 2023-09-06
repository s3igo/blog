import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'chromium',
            testDir: './tests',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            testDir: './tests',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            testDir: './tests',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    testDir: './tests/e2e',
    use: {
        baseURL: 'http://localhost:4321/',
    },
    webServer: {
        command: 'npm run preview',
        // eslint-disable-next-line no-undef
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        url: 'http://localhost:4321/',
    },
});
