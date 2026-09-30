/**
 * @fileoverview End-to-end tests for pages rendered without JavaScript.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from '@playwright/test';

// --------------------------------------------------------------------------------
// Setup
// --------------------------------------------------------------------------------

test.use({ javaScriptEnabled: false });

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test.describe('no-javascript', () => {
  test.describe('posts', () => {
    test('Korean post route should render its semantic HTML and heading', async ({
      page,
    }) => {
      const response = await page.goto('/ko/posts/everything-about-markdown');

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('article')).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 1, name: /마크다운.*모든 것/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 2, name: /1\. 마크다운.*대하여/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 3, name: /1-1\. 마크다운이란\?/ }),
      ).toBeVisible();
    });

    test('English post route should render its semantic HTML and heading', async ({
      page,
    }) => {
      const response = await page.goto('/en/posts/everything-about-markdown');

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('article')).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 1, name: /Everything about Markdown/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 2, name: /1\. About Markdown/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 3, name: /1-1\. What Is Markdown\?/ }),
      ).toBeVisible();
    });

    test('Korean post language toggle should preserve the post pathname', async ({
      page,
    }) => {
      const response = await page.goto('/ko/posts/everything-about-markdown#usage-guide');

      expect(response?.status()).toBe(200);

      const langToggle = page.getByRole('link', {
        name: '언어를 영어로 전환',
      });

      await expect(langToggle).toHaveAttribute(
        'href',
        '/en/posts/everything-about-markdown',
      );
      await langToggle.click();
      await expect(page).toHaveURL(/\/en\/posts\/everything-about-markdown$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });

  test.describe('categories', () => {
    test('Korean category route should render a localized post link', async ({
      page,
    }) => {
      const response = await page.goto('/ko/categories/markdown');

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('article')).toBeVisible();

      const postLink = page
        .locator('article')
        .getByRole('link', { name: /마크다운.*모든 것/ });

      await expect(postLink).toBeVisible();
      await expect(postLink).toHaveAttribute(
        'href',
        '/ko/posts/everything-about-markdown',
      );
    });

    test('English category route should render a localized post link', async ({
      page,
    }) => {
      const response = await page.goto('/en/categories/markdown');

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('article')).toBeVisible();

      const postLink = page
        .locator('article')
        .getByRole('link', { name: /Everything about Markdown/ });

      await expect(postLink).toBeVisible();
      await expect(postLink).toHaveAttribute(
        'href',
        '/en/posts/everything-about-markdown',
      );
    });

    test('Korean category language toggle should preserve the category pathname', async ({
      page,
    }) => {
      const response = await page.goto('/ko/categories/markdown?field=title&sort=asc');

      expect(response?.status()).toBe(200);

      const langToggle = page.getByRole('link', {
        name: '언어를 영어로 전환',
      });

      await expect(langToggle).toHaveAttribute('href', '/en/categories/markdown');
      await langToggle.click();
      await expect(page).toHaveURL(/\/en\/categories\/markdown$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });
});
