/**
 * @fileoverview Test for `mdast-to-text.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading, Table } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
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
    const clonedHeading = structuredClone(heading);

    assert.notStrictEqual(heading, clonedHeading);

    await mdastToText(heading);

    assert.deepStrictEqual(heading, clonedHeading);

    mdastToTextSync(heading);

    assert.deepStrictEqual(heading, clonedHeading);
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
    const tree = fromMarkdown('First  \n**Second**');

    assert.strictEqual(await mdastToText(tree), 'First\nSecond');
    assert.strictEqual(mdastToTextSync(tree), 'First\nSecond');
  });

  it('should preserve paragraph boundaries while stripping inline formatting', async () => {
    const tree = fromMarkdown('**Hello** *world*\n\nNext paragraph');

    assert.strictEqual(await mdastToText(tree), 'Hello world\n\nNext paragraph');
    assert.strictEqual(mdastToTextSync(tree), 'Hello world\n\nNext paragraph');
  });

  it('should include nested image alt text without the image URL or title', async () => {
    const tree = fromMarkdown('**![icon](icon.png "Image title")**');

    assert.strictEqual(await mdastToText(tree), 'icon');
    assert.strictEqual(mdastToTextSync(tree), 'icon');
  });

  it('should omit images with empty alt text without falling back to their titles', async () => {
    const tree = fromMarkdown('![](icon.png "Image title")');

    assert.strictEqual(await mdastToText(tree), '');
    assert.strictEqual(mdastToTextSync(tree), '');
  });

  it('should extract reference image alt text without surrounding definitions', async () => {
    const tree = fromMarkdown('![icon][image]\n\n[image]: icon.png');

    assert.strictEqual(await mdastToText(tree), 'icon');
    assert.strictEqual(mdastToTextSync(tree), 'icon');
  });

  it('should extract formatted reference link text without surrounding definitions', async () => {
    const tree = fromMarkdown(
      '[**Reference** text][source]\n\n[source]: https://example.com',
    );

    assert.strictEqual(await mdastToText(tree), 'Reference text');
    assert.strictEqual(mdastToTextSync(tree), 'Reference text');
  });

  it('should omit inline HTML tags while preserving Markdown text', async () => {
    const tree = fromMarkdown('<span>label</span>');

    assert.strictEqual(await mdastToText(tree), 'label');
    assert.strictEqual(mdastToTextSync(tree), 'label');
  });

  it('should omit raw HTML blocks and their contents', async () => {
    const tree = fromMarkdown('Before\n\n<div>Hidden</div>\n\nAfter');

    assert.strictEqual(await mdastToText(tree), 'Before\n\nAfter');
    assert.strictEqual(mdastToTextSync(tree), 'Before\n\nAfter');
  });

  it('should preserve code text and its whitespace', async () => {
    const tree = fromMarkdown('```ts\nconst value = 1;\n  next();\n```');

    assert.strictEqual(await mdastToText(tree), 'const value = 1;\n  next();\n');
    assert.strictEqual(mdastToTextSync(tree), 'const value = 1;\n  next();\n');
  });

  it('should preserve table text and extract standalone table cells', async () => {
    const table: Table = {
      type: 'table',
      children: [
        {
          type: 'tableRow',
          children: [{ type: 'tableCell', children: [{ type: 'text', value: 'Cell' }] }],
        },
      ],
    };

    assert.strictEqual(await mdastToText(table), 'Cell');
    assert.strictEqual(mdastToTextSync(table), 'Cell');
  });

  it('should preserve inline and block math without dollar delimiters', async () => {
    const tree = unified()
      .use(remarkParse)
      .use(remarkMath)
      .parse('The formula is $x + y$.\n\n$$\n\\frac{a}{b}\n$$');

    assert.strictEqual(await mdastToText(tree), 'The formula is x + y.\n\n\\frac{a}{b}');
    assert.strictEqual(mdastToTextSync(tree), 'The formula is x + y.\n\n\\frac{a}{b}');
  });

  it('should omit nested task checkboxes without modifying the original tree', async () => {
    const tree = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .parse('- [x] Parent task\n  - [ ] Child task');
    const clonedTree = structuredClone(tree);

    assert.strictEqual(await mdastToText(tree), 'Parent task\nChild task');
    assert.deepStrictEqual(tree, clonedTree);
    assert.strictEqual(mdastToTextSync(tree), 'Parent task\nChild task');
    assert.deepStrictEqual(tree, clonedTree);
  });
});
