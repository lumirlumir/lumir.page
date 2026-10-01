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
  test('Pressing `L` should switch the current page to the other language', async ({
    page,
  }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.keyboard.press('l');

    await expect(page).toHaveURL(/\/en\/posts\/everything-about-markdown$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Pressing `T` should toggle the current theme', async ({ page }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    });

    await page.keyboard.press('t');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await page.evaluate(() => localStorage.getItem('data-theme'))).toBe('light');
  });

  test('Pressing `/` should open the search dialog', async ({ page }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.keyboard.press('/');

    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible();
  });

  test('Pressing `Ctrl+K` should open the search dialog', async ({ page }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.keyboard.press('Control+k');

    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible();
  });

  test('Pressing `Cmd+K` should open the search dialog', async ({ page }) => {
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });

    await page.keyboard.press('Meta+k');

    await expect(page.getByRole('dialog', { name: '검색' })).toBeVisible();
  });
});
