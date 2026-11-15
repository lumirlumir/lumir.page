/**
 * @fileoverview End-to-end tests for the editorial layout and local search integration.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from '@playwright/test';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test.describe('redesign', () => {
  test('Korean home should retain its editorial sections and localized post links', async ({
    page,
  }) => {
    await page.goto('/ko');

    await expect(page.locator('[data-page="home"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: '시리즈로 읽기' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '많이 읽은 글' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '최근에 쓴 글' })).toBeVisible();
    await expect(page.locator('article[data-variant]')).toHaveCount(9);
    await expect(page.locator('main a[href^="/ko/posts/"]')).toHaveCount(9);
  });

  test('Local search should navigate from the English home to the existing post title anchor', async ({
    page,
  }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    const dialog = page.getByRole('dialog', { name: 'Search', exact: true });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('searchbox', { name: 'Search', exact: true }).fill('require');
    await dialog
      .locator('a[href="/en/posts/require-and-import#require-and-import"]')
      .click();

    await expect(page).toHaveURL('/en/posts/require-and-import#require-and-import');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('h1#require-and-import')).toBeVisible();
    await expect(page.locator('[data-page="post"] h1')).toHaveCount(1);
    await expect(page.locator('[data-page="post"] > header > p')).toHaveCount(1);
  });

  test('Bilingual sort controls should reorder editorial cards without leaving the category', async ({
    page,
  }) => {
    await page.goto('/en/categories/javascript', { waitUntil: 'networkidle' });
    const sort = page.getByRole('button', { name: 'Sort', exact: true });
    await expect(sort).toContainText('Sort');
    await expect(sort).toContainText('정렬');
    await sort.click();
    await expect(sort).toHaveAttribute('aria-expanded', 'true');

    const titles = page.locator('article[data-variant="archive"] h3');
    await page.getByRole('button', { name: 'Title / Asc', exact: true }).click();
    await expect(page).toHaveURL('/en/categories/javascript?field=title&sort=asc');
    await expect(titles.first()).toHaveText('Composition of JavaScript');
    const ascendingTitles = await titles.allTextContents();

    await page.getByRole('button', { name: 'Title / Desc', exact: true }).click();
    await expect(page).toHaveURL('/en/categories/javascript?field=title&sort=desc');
    await expect(titles).toHaveText(ascendingTitles.toReversed());
    await expect(page.locator('[data-page="category"]')).toBeVisible();
  });
});
