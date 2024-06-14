import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
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
        {
            name: 'vrt',
            testDir: './tests/vrt',
            use: { ...devices['Desktop Chrome'] },
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
