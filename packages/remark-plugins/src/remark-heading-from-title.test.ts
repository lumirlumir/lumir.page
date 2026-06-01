/**
 * @fileoverview Test for `remark-heading-from-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { remarkHeadingFromTitle } from './remark-heading-from-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-heading-from-title', () => {
  describe('when the title is provided', () => {
    it('should prepend an h1 heading to the markdown document', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, { title: 'lumir' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, '# lumir\n\nparagraph\n');
    });

    it('should preserve markdown syntax inside the title heading', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, { title: '`lumir` **page**' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, '# `lumir` **page**\n\nparagraph\n');
    });
  });

  describe('when the title is empty', () => {
    it('should keep the original markdown content unchanged when the title is empty', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, { title: '' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the option is `null`', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(
          remarkHeadingFromTitle,
          null as unknown as Parameters<typeof remarkHeadingFromTitle>[0],
        )
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the option is `undefined` - 1', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, undefined)
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the option is `undefined` - 2', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle)
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the title is `undefined`', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, { title: undefined })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the title is not a string', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkHeadingFromTitle, { title: 123 as unknown as string })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });
  });
});
