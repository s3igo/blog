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
        baseURL: 'http://localhost:4321',
    },
    webServer: {
        command: 'bun run preview',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        url: 'http://localhost:4321',
    },
});
