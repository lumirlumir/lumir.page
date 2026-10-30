/**
 * @fileoverview Defines the helper functions for converting markdown content into structured heading data.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  remarkCustomHeadingId,
  remarkHeadingFromTitle,
  type RemarkHeadingFromTitleOptions,
} from '@lumir/remark-plugins';
import type { Nodes, Root } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { type VMarkdownHeading } from '@/data/v-markdown';
import { mdastToTextSync } from '@/utils/mdast-to-text';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type MarkdownToHeadingOptions = RemarkHeadingFromTitleOptions;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content into structured heading data.
 * @param markdown The markdown content to convert.
 * @param options Optional settings for the conversion process.
 * @throws {Error} If a Markdown heading or supplied title has no custom ID.
 * @example
 * ```ts
 * import { markdownToHeading } from '@/utils/markdown-to-heading';
 *
 * const markdown = 'Introduction\n\n## Heading {#heading}\n\nSome content';
 * const headings = await markdownToHeading(markdown, { title: 'Awesome Title {#awesome-title}' });
 *
 * console.log(headings);
 * // Output:
 * // [
 * //   {
 * //     id: 'awesome-title',
 * //     text: 'Awesome Title',
 * //     depth: 1,
 * //     content: 'Introduction'
 * //   },
 * //   {
 * //     id: 'heading',
 * //     text: 'Heading',
 * //     depth: 2,
 * //     content: 'Some content'
 * //   }
 * // ]
 * ```
 */
export async function markdownToHeading(
  markdown: string,
  options?: MarkdownToHeadingOptions,
): Promise<VMarkdownHeading[]> {
  // NOTE: Keep text transformations and heading IDs aligned with `markdownToHtml`.
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkHeadingFromTitle, options)
    .use(remarkCustomHeadingId);
  const tree = (await processor.run(processor.parse(markdown))) as Root;
  const headings: VMarkdownHeading[] = [];

  let vMarkdownHeading: (VMarkdownHeading & { content: string }) | null = null;

  function walk(node: Nodes): void {
    if (node.type === 'heading') {
      const id = node.data?.hProperties?.id;

      if (typeof id !== 'string') {
        throw new Error(
          `Heading "${mdastToTextSync(node)}" at line ${node.position?.start.line} needs an explicit custom ID`,
        );
      }

      headings.push(
        (vMarkdownHeading = {
          id,
          text: mdastToTextSync(node),
          depth: node.depth,
          content: '',
        }),
      );

      return;
    }

    if (
      node.type === 'paragraph' ||
      node.type === 'table' ||
      node.type === 'code' ||
      node.type === 'math'
    ) {
      const value = mdastToTextSync(node).trim();

      if (value && vMarkdownHeading) {
        vMarkdownHeading.content += `${vMarkdownHeading.content ? ' ' : ''}${value}`;
      }

      return;
    }

    if ('children' in node) {
      node.children.forEach(walk);
    }
  }

  walk(tree);

  return headings;
}
