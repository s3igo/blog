import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run preview:e2e',
        url: 'http://localhost:3000/',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
    use: {
        baseURL: 'http://localhost:3000',
    },
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
});
