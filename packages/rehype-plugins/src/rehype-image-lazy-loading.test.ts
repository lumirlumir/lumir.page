/**
 * @fileoverview Test for `rehype-image-lazy-loading.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { rehypeImageLazyLoading } from './rehype-image-lazy-loading.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-image-lazy-loading', () => {
  describe('when the image does not have a loading attribute', () => {
    it('should add the `loading="lazy"` attribute', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageLazyLoading)
        .use(rehypeStringify)
        .process('<img src="http://example.com/image.png">');

      assert.strictEqual(
        file.value,
        '<img src="http://example.com/image.png" loading="lazy">',
      );
    });

    it('should add the `loading="lazy"` attribute to all images', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageLazyLoading)
        .use(rehypeStringify)
        .process(
          [
            '<img src="http://example.com/image.png">',
            '',
            '<img src="http://example.com/image.png">',
            '',
          ].join('\n'),
        );

      assert.strictEqual(
        file.value,
        [
          '<img src="http://example.com/image.png" loading="lazy">',
          '',
          '<img src="http://example.com/image.png" loading="lazy">',
          '',
        ].join('\n'),
      );
    });
  });

  describe('when the image already has a loading attribute', () => {
    it('should keep the original loading attribute - 1', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageLazyLoading)
        .use(rehypeStringify)
        .process('<img src="http://example.com/image.png" loading="eager">');

      assert.strictEqual(
        file.value,
        '<img src="http://example.com/image.png" loading="eager">',
      );
    });

    it('should keep the original loading attribute - 2', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageLazyLoading)
        .use(rehypeStringify)
        .process('<img src="http://example.com/image.png" loading="auto">');

      assert.strictEqual(
        file.value,
        '<img src="http://example.com/image.png" loading="auto">',
      );
    });
  });
});
