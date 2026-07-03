/**
 * @fileoverview Test for `rehype-image-url-replace.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { rehypeImageUrlReplace } from './rehype-image-url-replace.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-image-url-replace', () => {
  describe('when the image URL matches the search pattern', () => {
    it('should replace the image URL', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .use(rehypeStringify)
        .process('<img src="/public/images/example.png">');

      assert.strictEqual(file.value, '<img src="/images/example.png">');
    });

    it('should replace all matching image URLs', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .use(rehypeStringify)
        .process(
          [
            '<img src="/public/images/example-1.png">',
            '',
            '<img src="/public/images/example-2.png">',
            '',
          ].join('\n'),
        );

      assert.strictEqual(
        file.value,
        [
          '<img src="/images/example-1.png">',
          '',
          '<img src="/images/example-2.png">',
          '',
        ].join('\n'),
      );
    });

    it('should handle `y` flag in the search pattern', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/y,
          replaceValue: '',
        })
        .use(rehypeStringify)
        .process('<img src="/public/images/example.png">');

      assert.strictEqual(file.value, '<img src="/images/example.png">');
    });
  });

  describe('when the image URL does not match the search pattern', () => {
    it('should keep the original image URL', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .use(rehypeStringify)
        .process('<img src="/assets/example.png">');

      assert.strictEqual(file.value, '<img src="/assets/example.png">');
    });
  });
});
