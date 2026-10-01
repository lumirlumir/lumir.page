/**
 * @fileoverview End-to-end tests for keyboard shortcuts.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from '@playwright/test';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test.describe('keyboard-shortcut', () => {
  test('Dispatched `L` keydown should switch the current page to the other language', async ({
    page,
  }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.evaluate(() => {
      dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
    });

    await expect(page).toHaveURL(/\/en\/posts\/everything-about-markdown$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Dispatched `T` keydown should toggle the current theme', async ({ page }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    });

    await page.evaluate(() => {
      dispatchEvent(new KeyboardEvent('keydown', { key: 't' }));
    });

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await page.evaluate(() => localStorage.getItem('data-theme'))).toBe('light');
  });
});
