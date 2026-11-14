/**
 * @fileoverview Test for `remark-blockquote-from-description.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { remarkBlockquoteFromDescription } from './remark-blockquote-from-description.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-blockquote-from-description', () => {
  describe('when the description is provided', () => {
    it('should prepend a blockquote to the markdown document', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, { description: 'lumir' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, '> lumir\n\nparagraph\n');
    });

    it('should preserve markdown syntax inside the description blockquote', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, { description: '`lumir` **page**' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, '> `lumir` **page**\n\nparagraph\n');
    });
  });

  describe('when the description spans multiple lines', () => {
    it('should keep lines and paragraphs inside a single blockquote with CR line endings', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, {
          description:
            'First line\rSecond line\rThird line\rFourth line\r\rSecond paragraph',
        })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(
        file.value,
        '> First line\n> Second line\n> Third line\n> Fourth line\n>\n> Second paragraph\n\nparagraph\n',
      );
    });

    it('should keep lines and paragraphs inside a single blockquote with LF line endings', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, {
          description:
            'First line\nSecond line\nThird line\nFourth line\n\nSecond paragraph',
        })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(
        file.value,
        '> First line\n> Second line\n> Third line\n> Fourth line\n>\n> Second paragraph\n\nparagraph\n',
      );
    });

    it('should keep lines and paragraphs inside a single blockquote with CRLF line endings', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, {
          description:
            'First line\r\nSecond line\r\nThird line\r\nFourth line\r\n\r\nSecond paragraph',
        })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(
        file.value,
        '> First line\n> Second line\n> Third line\n> Fourth line\n>\n> Second paragraph\n\nparagraph\n',
      );
    });

    it('should keep lines and paragraphs inside a single blockquote with mixed line endings', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, {
          description:
            'First line\rSecond line\nThird line\r\nFourth line\r\n\r\nSecond paragraph',
        })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(
        file.value,
        '> First line\n> Second line\n> Third line\n> Fourth line\n>\n> Second paragraph\n\nparagraph\n',
      );
    });
  });

  describe('when the description is empty', () => {
    it('should keep the original markdown content unchanged when the description is empty', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, { description: '' })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the option is `null`', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(
          remarkBlockquoteFromDescription,
          null as unknown as Parameters<typeof remarkBlockquoteFromDescription>[0],
        )
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when options are explicitly `undefined`', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, undefined)
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when options are omitted', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription)
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the description is `undefined`', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, { description: undefined })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });

    it('should keep the original markdown content unchanged when the description is not a string', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkBlockquoteFromDescription, { description: 123 as unknown as string })
        .use(remarkStringify)
        .process('paragraph\n');

      assert.strictEqual(file.value, 'paragraph\n');
    });
  });
});
