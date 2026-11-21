/**
 * @fileoverview End-to-end tests for post image zoom.
 */

import { expect, test } from '@playwright/test';

test('a post image opens at a larger size and another image reuses the dialog', async ({
  page,
}) => {
  await page.goto('/ko/posts/composition-of-javascript');

  const first = page.getByRole('button', {
    name: '이미지 확대 (window, JavaScript, DOM, BOM)',
  });
  const dialog = page.getByRole('dialog', { name: '이미지 확대' });
  const thumbnailWidth = await first.evaluate(image => image.clientWidth);
  await first.click();
  const preview = dialog.getByAltText('window, JavaScript, DOM, BOM');
  await expect(preview).toHaveAttribute(
    'src',
    /\/composition-of-javascript\/1\.webp\?raw=true$/,
  );
  await expect
    .poll(() => preview.evaluate(image => image.clientWidth))
    .toBeGreaterThan(thumbnailWidth);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();

  const second = page.getByRole('button', { name: '이미지 확대 (window object)' });
  await second.press('Space');
  await expect(dialog.getByAltText('window object')).toHaveAttribute(
    'src',
    /\/composition-of-javascript\/2\.webp\?raw=true$/,
  );
  await dialog.getByRole('button', { name: '닫기' }).click();
  await expect(dialog).toBeHidden();
  await expect(second).toBeFocused();
});

test('an image inside a Markdown link keeps its original destination', async ({
  page,
}) => {
  const destination = 'https://en.wikipedia.org/wiki/Rubber_duck';
  await page.route(destination, route =>
    route.fulfill({ contentType: 'text/html', body: 'Rubber duck' }),
  );
  await page.goto('/en/posts/everything-about-markdown#2-9-1-3-image-links');

  const link = page.getByRole('link', { name: 'Seokchon Lake Rubber Duck', exact: true });
  await link.getByRole('img').click();
  await expect(page).toHaveURL(destination);
});

test('the image fits a landscape phone and closes when the backdrop is tapped', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/en/posts/composition-of-javascript');
  await page
    .getByRole('button', { name: 'Enlarge image (window, JavaScript, DOM, BOM)' })
    .press('Enter');

  const dialog = page.getByRole('dialog', { name: 'Enlarge image' });
  await dialog
    .getByAltText('window, JavaScript, DOM, BOM')
    .evaluate(image => (image as HTMLImageElement).decode());
  expect(
    await dialog.evaluate(element => element.scrollHeight <= element.clientHeight),
  ).toBe(true);
  await page.mouse.click(1, 1);
  await expect(dialog).toBeHidden();
});
