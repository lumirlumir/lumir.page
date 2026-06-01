/**
 * @fileoverview Test for `remark-custom-heading-id.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import type { Root } from 'mdast';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { remarkCustomHeadingId } from './remark-custom-heading-id.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Processes the given markdown string using the `remark-custom-heading-id` plugin.
 * @param markdown The markdown string to process.
 * @returns A promise that resolves to a `VFile` whose `value` is the processed HTML.
 */
function processMarkdown(markdown: string) {
  return unified()
    .use(remarkParse)
    .use(remarkCustomHeadingId)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-custom-heading-id', () => {
  describe('when headings include custom id markers', () => {
    // Basic
    it('should convert trailing custom id markers into heading id attributes - 1', async () => {
      const file = await processMarkdown('# unicorn {#foo-bar}');

      assert.strictEqual(file.value, '<h1 id="foo-bar">unicorn</h1>');
    });

    it('should convert trailing custom id markers into heading id attributes - 2', async () => {
      const file = await processMarkdown('# a {#aa}');

      assert.strictEqual(file.value, '<h1 id="aa">a</h1>');
    });

    it('should convert trailing custom id markers into heading id attributes - 3', async () => {
      const file = await processMarkdown('# b');

      assert.strictEqual(file.value, '<h1>b</h1>');
    });

    it('should convert trailing custom id markers into heading id attributes - 4', async () => {
      const file = await processMarkdown('## c {#foo bar}');

      assert.strictEqual(file.value, '<h2 id="foo bar">c</h2>');
    });

    it('should convert trailing custom id markers into heading id attributes - 5', async () => {
      const file = await processMarkdown('### d {#baz}');

      assert.strictEqual(file.value, '<h3 id="baz">d</h3>');
    });

    // Trailing spaces and tabs
    it('ATX: should handle trailing spaces after custom id markers', async () => {
      const file = await processMarkdown('# heading {#foo}   ');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX: should handle trailing tabs after custom id markers', async () => {
      const file = await processMarkdown('# heading {#foo}\t\t\t');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX Closed: should handle trailing spaces after custom id markers', async () => {
      const file = await processMarkdown('# heading {#foo}   #');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX Closed: should handle trailing tabs after custom id markers', async () => {
      const file = await processMarkdown('# heading {#foo}\t\t\t#');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle trailing spaces after custom id markers - H1', async () => {
      const file = await processMarkdown('heading {#foo}   \n=====');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle trailing tabs after custom id markers - H1', async () => {
      const file = await processMarkdown('heading {#foo}\t\t\t\n=====');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle trailing spaces after custom id markers - H2', async () => {
      const file = await processMarkdown('heading {#foo}   \n-----');

      assert.strictEqual(file.value, '<h2 id="foo">heading</h2>');
    });

    it('Setext: should handle trailing tabs after custom id markers - H2', async () => {
      const file = await processMarkdown('heading {#foo}\t\t\t\n-----');

      assert.strictEqual(file.value, '<h2 id="foo">heading</h2>');
    });

    // Leading spaces and tabs
    it('should ignore custom id markers without leading spaces or tabs', async () => {
      const file = await processMarkdown('# heading{#foo}');

      assert.strictEqual(file.value, '<h1>heading{#foo}</h1>');
    });

    it('ATX: should handle leading spaces before custom id markers', async () => {
      const file = await processMarkdown('# heading   {#foo}');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX: should handle leading tabs before custom id markers', async () => {
      const file = await processMarkdown('# heading\t\t\t{#foo}');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX Closed: should handle leading spaces before custom id markers', async () => {
      const file = await processMarkdown('# heading   {#foo} #');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('ATX Closed: should handle leading tabs before custom id markers', async () => {
      const file = await processMarkdown('# heading\t\t\t{#foo} #');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle leading spaces before custom id markers - H1', async () => {
      const file = await processMarkdown('heading   {#foo}\n=====');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle leading tabs before custom id markers - H1', async () => {
      const file = await processMarkdown('heading\t\t\t{#foo}\n=====');

      assert.strictEqual(file.value, '<h1 id="foo">heading</h1>');
    });

    it('Setext: should handle leading spaces before custom id markers - H2', async () => {
      const file = await processMarkdown('heading   {#foo}\n-----');

      assert.strictEqual(file.value, '<h2 id="foo">heading</h2>');
    });

    it('Setext: should handle leading tabs before custom id markers - H2', async () => {
      const file = await processMarkdown('heading\t\t\t{#foo}\n-----');

      assert.strictEqual(file.value, '<h2 id="foo">heading</h2>');
    });

    // Deeply nested `text` node in the last position
    it('should ignore custom id markers wrapped in emphasis nodes', async () => {
      const file = await processMarkdown('# heading *{#custom-id}*');

      assert.strictEqual(file.value, '<h1>heading <em>{#custom-id}</em></h1>');
    });

    it('should ignore custom id markers wrapped in strong nodes', async () => {
      const file = await processMarkdown('# heading **{#custom-id}**');

      assert.strictEqual(file.value, '<h1>heading <strong>{#custom-id}</strong></h1>');
    });

    // `hProperties` preservation
    it('should preserve existing heading hProperties when adding a custom id', async () => {
      const file = await unified()
        .use(remarkParse)
        .use(() => (tree: Root) => {
          const [node] = tree.children;

          if (node?.type === 'heading') {
            node.data = {
              ...node.data,
              hProperties: { title: 'preserved' },
            };
          }
        })
        .use(remarkCustomHeadingId)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process('# heading {#foo}');

      assert.strictEqual(file.value, '<h1 title="preserved" id="foo">heading</h1>');
    });
  });
});
