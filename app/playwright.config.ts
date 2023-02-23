import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run preview',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:3000',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});
