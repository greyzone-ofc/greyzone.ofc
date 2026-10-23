import { expect, test } from '@playwright/test';

/**
 * Visual regression baselines for the marketing home.
 * Update with: npm run test:e2e:update
 * Prefer reduced-motion so animated sections stay stable.
 */
test.describe('visual baselines', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  async function ready(page: import('@playwright/test').Page) {
    await page.goto('/');
    await page.waitForFunction(() =>
      document.documentElement.classList.contains('js'),
    );
    await page.waitForLoadState('networkidle');
  }

  test('home desktop light', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await ready(page);
    await expect(page).toHaveScreenshot('home-desktop-light.png', {
      fullPage: true,
    });
  });

  test('home mobile light', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page);
    await expect(page).toHaveScreenshot('home-mobile-light.png', {
      fullPage: true,
    });
  });

  test('home desktop dark', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await ready(page);
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page).toHaveScreenshot('home-desktop-dark.png', {
      fullPage: true,
    });
  });
});
