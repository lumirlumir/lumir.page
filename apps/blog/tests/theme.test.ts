/**
 * @fileoverview End-to-end tests for theme preferences.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from '@playwright/test';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test.describe('theme', () => {
  test('Invalid saved theme should use the system preference and still toggle', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/ko/posts/everything-about-markdown', {
      waitUntil: 'networkidle',
    });
    await page.evaluate(() => {
      localStorage.setItem('data-theme', 'unexpected');
    });
    await page.reload({
      waitUntil: 'networkidle',
    });

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: '라이트 모드' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate(() => localStorage.getItem('data-theme'))).toBe('dark');
  });
});
