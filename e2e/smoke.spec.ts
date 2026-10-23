import { expect, test } from '@playwright/test';

test.describe('marketing home smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // SiteEffects adds `js` after mounting legacy interaction scripts.
    await page.waitForFunction(() =>
      document.documentElement.classList.contains('js'),
    );
  });

  test('loads hero and main landmarks', async ({ page }) => {
    await expect(page).toHaveTitle(/GREYZONE/i);
    await expect(page.locator('main#page')).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /GREYZONE\. We build websites/i,
      }),
    ).toBeVisible();
  });

  test('skip link targets main content', async ({ page }) => {
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await skip.focus();
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#page$/);
  });

  test('menu opens and closes with keyboard', async ({ page }) => {
    // Label toggles Open/Close — locate by id so the handle stays stable.
    const menuBtn = page.locator('#proMenu');
    await expect(menuBtn).toHaveAttribute('aria-label', 'Open menu');
    await menuBtn.click();

    const dialog = page.locator('#menuOverlay');
    await expect(dialog).toHaveClass(/open/);
    await expect(dialog).toHaveAttribute('aria-hidden', 'false');
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(menuBtn).toHaveAttribute('aria-label', 'Close menu');

    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveClass(/open/);
    await expect(dialog).toHaveAttribute('aria-hidden', 'true');
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(menuBtn).toHaveAttribute('aria-label', 'Open menu');
    await expect(menuBtn).toBeFocused();
  });

  test('hash navigation reaches contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Start a project' }).first().click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole('heading', { name: /Have something to/i }),
    ).toBeInViewport();
  });

  test('brief CTA composes a mailto action', async ({ page }) => {
    const briefBtn = page.locator('#briefBtn');
    await expect(briefBtn).toBeVisible();
    await expect(briefBtn).toHaveAttribute('data-mailto', /mailto:hello@greyzone\.in/);

    await page.locator('input[name="btype"][value="an application"]').check();
    await expect(briefBtn).toHaveAttribute(
      'data-mailto',
      /subject=New%20project%3A%20an%20application/,
    );
  });
});
