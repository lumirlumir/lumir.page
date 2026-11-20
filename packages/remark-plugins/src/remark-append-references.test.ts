/**
 * @fileoverview Test for `remark-append-references.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { remarkAppendReferences } from './remark-append-references.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-append-references', () => {
  it('should leave the body unchanged when the references list is empty', async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkAppendReferences, { references: [] })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process('Body.');

    assert.strictEqual(file.value, '<p>Body.</p>');
  });

  it('should append a references heading and preserve link text and order', async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkAppendReferences, { references: ['https://example.com/(a)', '/b'] })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process('Body.');

    assert.strictEqual(
      file.value,
      [
        '<p>Body.</p>',
        '<h2 id="references">References</h2>',
        '<ul>',
        '<li><a href="https://example.com/(a)">https://example.com/(a)</a></li>',
        '<li><a href="/b">/b</a></li>',
        '</ul>',
      ].join('\n'),
    );
  });

  it('should use the supplied references heading and keep the references ID', async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkAppendReferences, {
        references: ['https://example.com'],
        referencesHeading: '참고 링크',
      })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process('Body.');

    assert.include(file.value, '<h2 id="references">참고 링크</h2>');
  });
});
