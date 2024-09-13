import { test } from './index.ts';

test('indexページのスクリーンショットを撮影', async ({ page, mode }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
        path: `./vrt/index-${mode}.png`,
        fullPage: true,
    });
});

test('#astroページのスクリーンショットを撮影', async ({ page, mode }) => {
    await page.goto('/tags/astro');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
        path: `./vrt/astro-${mode}.png`,
        fullPage: true,
    });
});

test('#programmingページのスクリーンショットを撮影', async ({ page, mode }) => {
    await page.goto('/tags/programming');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
        path: `./vrt/programming-${mode}.png`,
        fullPage: true,
    });
});

test('#typescriptページのスクリーンショットを撮影', async ({ page, mode }) => {
    await page.goto('/tags/typescript');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
        path: `./vrt/typescript-${mode}.png`,
        fullPage: true,
    });
});
