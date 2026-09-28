/**
 * @fileoverview Integration tests to ensure that translated post headings share stable anchors.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { customHeadingIdRegex } from '@lumir/remark-plugins';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';
import { assert, describe, it } from 'vitest';
import createMarkdownCollection from '../../src/utils/markdown-collection.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();
const slugs = Object.keys(markdownCollection.byLangSlug.en);

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-heading-ids', () => {
  it('should ensure that translated post headings share stable anchors', async () => {
    await Promise.all(
      slugs.map(async slug => {
        const [englishHeadingIds, koreanHeadingIds] = await Promise.all(
          (['en', 'ko'] as const).map(async lang => {
            const { content } = await markdownCollection.loadVMarkdownFile(
              `${slug}.${lang}`,
            );
            const headingIds: string[] = [];

            visit(fromMarkdown(content), 'heading', node => {
              const textNode = node.children.at(-1);
              const id =
                textNode?.type === 'text'
                  ? customHeadingIdRegex.exec(textNode.value)?.groups?.id
                  : undefined;

              // Every Markdown heading must end with an explicit custom ID.
              assert.isDefined(
                id,
                `${slug}.${lang}: heading at line ${node.position?.start.line} needs an ID`,
              );
              headingIds.push(id);
            });

            return headingIds;
          }),
        );

        // Both translations must have the same heading IDs in the same order.
        assert.deepStrictEqual(englishHeadingIds, koreanHeadingIds, slug);

        // Heading IDs must be unique within each post.
        assert.strictEqual(
          new Set(englishHeadingIds).size,
          englishHeadingIds.length,
          slug,
        );

        // IDs must contain only lowercase English letters, digits, and hyphens.
        for (const headingId of englishHeadingIds) {
          assert.match(headingId, /^[a-z0-9-]+$/, slug);
        }
      }),
    );
  });
});
