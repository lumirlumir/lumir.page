/**
 * @fileoverview Test for `rehype-comment-remover.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { rehypeCommentRemover } from './rehype-comment-remover.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-comment-remover', () => {
  describe('when HTML contains comments', () => {
    it('should remove root-level comments', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeCommentRemover)
        .use(rehypeStringify)
        .process('<!-- before --><p>Hello World</p><!-- after -->');

      assert.strictEqual(file.value, '<p>Hello World</p>');
    });

    it('should remove nested comments', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeCommentRemover)
        .use(rehypeStringify)
        .process('<section><p>Hello<!-- hidden --> World</p></section>');

      assert.strictEqual(file.value, '<section><p>Hello World</p></section>');
    });

    it('should remove adjacent comments without skipping later comments', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeCommentRemover)
        .use(rehypeStringify)
        .process('<p>Hello<!-- first --><!-- second -->World</p>');

      assert.strictEqual(file.value, '<p>HelloWorld</p>');
    });
  });

  describe('when HTML does not contain comments', () => {
    it('should keep the original HTML', async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeCommentRemover)
        .use(rehypeStringify)
        .process('<section><p>Hello World</p></section>');

      assert.strictEqual(file.value, '<section><p>Hello World</p></section>');
    });
  });
});
