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
  test('Invalid document theme should use the default theme and still toggle', async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'unexpected');
    });

    await expect(page.getByRole('button', { name: '다크 모드' })).toBeVisible();
    await page.getByRole('button', { name: '다크 모드' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await page.evaluate(() => localStorage.getItem('data-theme'))).toBe('light');
  });

  test('Invalid saved theme should use the system preference and still toggle', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('data-theme', 'unexpected');
    });
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: '라이트 모드' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate(() => localStorage.getItem('data-theme'))).toBe('dark');
  });
});
