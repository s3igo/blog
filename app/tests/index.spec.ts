import { expect, test } from '@playwright/test';

test('メタ情報が正しい', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('tsukiyo-room');
});
