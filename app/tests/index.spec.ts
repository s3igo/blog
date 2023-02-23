import { expect, test } from '@playwright/test';

test('メタ情報が正しい', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page).toHaveTitle('tsukiyo-room');
});
