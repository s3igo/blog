import { test } from '@playwright/test';
import type { Test } from './utils';

export const run = (it: Test) => () => {
    it('indexページのスクリーンショットを撮影', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: './vrt/index.png', fullPage: true });
    });

    it('#astroページのスクリーンショットを撮影', async ({ page }) => {
        await page.goto('/tags/astro');
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: './vrt/astro.png', fullPage: true });
    });

    it('#programmingページのスクリーンショットを撮影', async ({ page }) => {
        await page.goto('/tags/programming');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: './vrt/programming.png',
            fullPage: true,
        });
    });

    it('#typescriptページのスクリーンショットを撮影', async ({ page }) => {
        await page.goto('/tags/typescript');
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: './vrt/typescript.png', fullPage: true });
    });
};

test.describe('ページ', run(test));
