import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm -w app run preview',
        url: 'http://localhost:3000',
    },
    use: {
        baseURL: 'http://localhost:3000',
    },
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
    ],
});
