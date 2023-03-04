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
    use: {
        baseURL: 'http://localhost:3000',
    },
    webServer: {
        command: 'npm run preview:e2e',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        url: 'http://localhost:3000/',
    },
});
