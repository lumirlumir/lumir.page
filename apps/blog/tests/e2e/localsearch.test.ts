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
  test('Body-only Korean searches should show the matching section and navigate to its anchor', async ({
    page,
  }) => {
    await page.goto('/ko/posts/2558', { waitUntil: 'networkidle' });
    await page.keyboard.press('/');

    const dialog = page.getByRole('dialog', { name: '검색' });
    const input = dialog.getByRole('searchbox', { name: '검색' });
    await input.fill('툴팁');

    const result = dialog.locator(
      'a[href="/ko/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly#references"]',
    );
    await expect(result).toBeVisible();
    await expect(result).toContainText('참고');
    await expect(result.locator('mark').first()).toHaveText('툴팁');
    await result.click();

    await expect(page).toHaveURL(
      /\/ko\/posts\/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly#references$/,
    );
    await expect(dialog).toBeHidden();
    await expect(page.locator('h2#references')).toBeInViewport();
  });

  test('Keyboard selection should preserve the matching section anchor', async ({
    page,
  }) => {
    await page.goto('/ko/posts/2558', { waitUntil: 'networkidle' });
    await page.keyboard.press('/');

    const dialog = page.getByRole('dialog', { name: '검색' });
    const input = dialog.getByRole('searchbox', { name: '검색' });
    await input.fill('툴팁');
    await expect(dialog.locator('a[data-active="true"]')).toHaveAttribute(
      'href',
      '/ko/posts/when-using-file-based-metadata-the-favicon-is-not-displayed-correctly#references',
    );
    await input.press('Enter');

    await expect(page).toHaveURL(/#references$/);
    await expect(dialog).toBeHidden();
    await expect(page.locator('h2#references')).toBeInViewport();
  });

  test('Search result links should preserve the dialog for modified clicks and close it for same-tab navigation', async ({
    page,
  }) => {
    await page.goto('/ko/posts/2558', { waitUntil: 'networkidle' });
    await page.keyboard.press('/');

    const dialog = page.getByRole('dialog', { name: '검색' });
    const input = dialog.getByRole('searchbox', { name: '검색' });
    await input.fill('마크다운');

    const result = dialog.locator(
      'a[href="/ko/posts/everything-about-markdown#everything-about-markdown"]',
    );
    await expect(result).toBeVisible();
    await expect(result).toHaveAttribute(
      'href',
      '/ko/posts/everything-about-markdown#everything-about-markdown',
    );

    await result.click({ modifiers: ['ControlOrMeta'] });
    await expect(page).toHaveURL(/\/ko\/posts\/2558$/);
    await expect(dialog).toBeVisible();
    await expect(input).toHaveValue('마크다운');

    await result.click();
    await expect(page).toHaveURL(
      /\/ko\/posts\/everything-about-markdown#everything-about-markdown$/,
    );
    await expect(dialog).toBeHidden();
  });
});
