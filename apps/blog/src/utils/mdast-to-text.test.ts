/**
 * @fileoverview Tests plain-text extraction from mdast nodes.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading, Table } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { assert, describe, it } from 'vitest';
import { mdastToText, mdastToTextSync } from './mdast-to-text.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('mdast-to-text', () => {
  it('should preserve the original heading depth and formatted children', async () => {
    const heading: Heading = {
      type: 'heading',
      depth: 2,
      children: [
        { type: 'text', value: 'Hello' },
        { type: 'break' },
        { type: 'strong', children: [{ type: 'text', value: 'world' }] },
      ],
    };

    await mdastToText(heading);

    assert.deepEqual(heading, {
      type: 'heading',
      depth: 2,
      children: [
        { type: 'text', value: 'Hello' },
        { type: 'break' },
        { type: 'strong', children: [{ type: 'text', value: 'world' }] },
      ],
    });

    mdastToTextSync(heading);

    assert.deepEqual(heading, {
      type: 'heading',
      depth: 2,
      children: [
        { type: 'text', value: 'Hello' },
        { type: 'break' },
        { type: 'strong', children: [{ type: 'text', value: 'world' }] },
      ],
    });
  });

  it('should extract plain text from a formatted heading', async () => {
    const heading: Heading = {
      type: 'heading',
      depth: 2,
      children: [
        { type: 'text', value: 'Hello ' },
        { type: 'strong', children: [{ type: 'text', value: 'world' }] },
      ],
    };

    assert.strictEqual(await mdastToText(heading), 'Hello world');
    assert.strictEqual(mdastToTextSync(heading), 'Hello world');
  });

  it('should convert a standalone hard break to a newline', async () => {
    assert.strictEqual(await mdastToText({ type: 'break' }), '\n');
    assert.strictEqual(mdastToTextSync({ type: 'break' }), '\n');
  });

  it('should convert a nested hard break to a newline', async () => {
    assert.strictEqual(
      await mdastToText(fromMarkdown('First  \n**Second**')),
      'First\nSecond',
    );
    assert.strictEqual(
      mdastToTextSync(fromMarkdown('First  \n**Second**')),
      'First\nSecond',
    );
  });

  // Options - When Omitted
  it('should strip inline formatting when options are omitted', async () => {
    const tree = fromMarkdown('**Hello** *world*');

    assert.strictEqual(await mdastToText(tree), 'Hello world');
    assert.strictEqual(mdastToTextSync(tree), 'Hello world');
  });

  it('should include image alt text when options are omitted', async () => {
    const tree = fromMarkdown('![icon](icon.png)');

    assert.strictEqual(await mdastToText(tree), 'icon');
    assert.strictEqual(mdastToTextSync(tree), 'icon');
  });

  it('should strip inline HTML when options are omitted', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(await mdastToText(tree), 'label');
    assert.strictEqual(mdastToTextSync(tree), 'label');
  });

  it('should remove code text when options are omitted', async () => {
    assert.strictEqual(
      await mdastToText({ type: 'code', value: 'const value = 1;' }),
      '',
    );
    assert.strictEqual(mdastToTextSync({ type: 'code', value: 'const value = 1;' }), '');
  });

  // Options - When provided
  it('should preserve code text when requested with `keep`', async () => {
    assert.strictEqual(
      await mdastToText({ type: 'code', value: 'const value = 1;' }, { keep: ['code'] }),
      'const value = 1;',
    );
    assert.strictEqual(
      mdastToTextSync({ type: 'code', value: 'const value = 1;' }, { keep: ['code'] }),
      'const value = 1;',
    );
  });

  it('should preserve table cell text when requested with `keep`', async () => {
    const table: Table = {
      type: 'table',
      children: [
        {
          type: 'tableRow',
          children: [{ type: 'tableCell', children: [{ type: 'text', value: 'Cell' }] }],
        },
      ],
    };

    assert.strictEqual(
      await mdastToText(table, { keep: ['table', 'tableCell'] }),
      'Cell',
    );
    assert.strictEqual(mdastToTextSync(table, { keep: ['table', 'tableCell'] }), 'Cell');
  });

  it('should omit nested image alt text when explicitly disabled', async () => {
    const tree = fromMarkdown('**![icon](icon.png)**');

    assert.strictEqual(
      await mdastToText(tree, { keep: ['image'], includeImageAlt: false }),
      '',
    );
    assert.strictEqual(
      mdastToTextSync(tree, { keep: ['image'], includeImageAlt: false }),
      '',
    );
  });

  it('should include preserved HTML when explicitly enabled', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(
      await mdastToText(tree, { keep: ['html'], includeHtml: true }),
      '<span>label</span>',
    );
    assert.strictEqual(
      mdastToTextSync(tree, { keep: ['html'], includeHtml: true }),
      '<span>label</span>',
    );
  });

  it('should keep HTML options independent between conversions', async () => {
    const tree = fromMarkdown('<span>label</span>');

    await mdastToText(tree, { keep: ['html'], includeHtml: true });
    assert.strictEqual(await mdastToText(tree), 'label');
    mdastToTextSync(tree, { keep: ['html'], includeHtml: true });
    assert.strictEqual(mdastToTextSync(tree), 'label');
  });

  it('should include preserved image alt text when `includeImageAlt` is omitted', async () => {
    const tree = fromMarkdown('![icon](icon.png)');

    assert.strictEqual(await mdastToText(tree, { keep: ['image'] }), 'icon');
    assert.strictEqual(mdastToTextSync(tree, { keep: ['image'] }), 'icon');
  });

  it('should include preserved image alt text when `includeImageAlt` is undefined', async () => {
    const tree = fromMarkdown('![icon](icon.png)');

    assert.strictEqual(
      await mdastToText(tree, { keep: ['image'], includeImageAlt: undefined }),
      'icon',
    );
    assert.strictEqual(
      mdastToTextSync(tree, { keep: ['image'], includeImageAlt: undefined }),
      'icon',
    );
  });

  it('should include preserved HTML when `includeHtml` is omitted', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(await mdastToText(tree, { keep: ['html'] }), '<span>label</span>');
    assert.strictEqual(mdastToTextSync(tree, { keep: ['html'] }), '<span>label</span>');
  });

  it('should include preserved HTML when `includeHtml` is undefined', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(
      await mdastToText(tree, { keep: ['html'], includeHtml: undefined }),
      '<span>label</span>',
    );
    assert.strictEqual(
      mdastToTextSync(tree, { keep: ['html'], includeHtml: undefined }),
      '<span>label</span>',
    );
  });

  it('should remove code text when keep is undefined', async () => {
    assert.strictEqual(
      await mdastToText({ type: 'code', value: 'const value = 1;' }, { keep: undefined }),
      '',
    );
    assert.strictEqual(
      mdastToTextSync({ type: 'code', value: 'const value = 1;' }, { keep: undefined }),
      '',
    );
  });

  it('should preserve strong text when remove is undefined', async () => {
    const tree = fromMarkdown('**Visible**');

    assert.strictEqual(await mdastToText(tree, { remove: undefined }), 'Visible');
    assert.strictEqual(mdastToTextSync(tree, { remove: undefined }), 'Visible');
  });

  it('should omit preserved HTML when `includeHtml` is explicitly false', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(
      await mdastToText(tree, { keep: ['html'], includeHtml: false }),
      'label',
    );
    assert.strictEqual(
      mdastToTextSync(tree, { keep: ['html'], includeHtml: false }),
      'label',
    );
  });

  it('should remove nodes requested with remove', async () => {
    const tree = fromMarkdown('**Visible** hidden');

    assert.strictEqual(await mdastToText(tree, { remove: ['strong'] }), ' hidden');
    assert.strictEqual(mdastToTextSync(tree, { remove: ['strong'] }), ' hidden');
  });

  it('should keep removal options independent between conversions', async () => {
    const tree = fromMarkdown('**Visible** hidden');

    await mdastToText(tree, { remove: ['strong'] });
    assert.strictEqual(await mdastToText(tree), 'Visible hidden');
    mdastToTextSync(tree, { remove: ['strong'] });
    assert.strictEqual(mdastToTextSync(tree), 'Visible hidden');
  });
});
