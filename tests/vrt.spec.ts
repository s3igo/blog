import { test } from '@playwright/test';

test('indexページのスクリーンショットを撮影', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: './vrt/index.png', fullPage: true });
});
