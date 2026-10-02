/**
 * @fileoverview End-to-end tests for local search.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from '@playwright/test';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test.describe('localsearch', () => {
  test('Search result links should preserve the dialog for modified clicks and close it for same-tab navigation', async ({
    page,
  }) => {
    await page.goto('/ko/posts/2558', { waitUntil: 'networkidle' });
    await page.keyboard.press('/');

    const dialog = page.getByRole('dialog', { name: '검색' });
    const input = dialog.getByRole('searchbox', { name: '검색' });
    await input.fill('마크다운');

    const result = dialog.locator('a[href="/ko/posts/everything-about-markdown"]');
    await expect(result).toBeVisible();
    await expect(result).toHaveAttribute('href', '/ko/posts/everything-about-markdown');

    await result.click({ modifiers: ['ControlOrMeta'] });
    await expect(page).toHaveURL(/\/ko\/posts\/2558$/);
    await expect(dialog).toBeVisible();
    await expect(input).toHaveValue('마크다운');

    await result.click();
    await expect(page).toHaveURL(/\/ko\/posts\/everything-about-markdown$/);
    await expect(dialog).toBeHidden();
  });
});
