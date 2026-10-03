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

import { customHeadingIdRegex, remarkHeadingFromTitle } from '@lumir/remark-plugins';
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

interface MarkdownToHeadingOptions {
  /**
   * Prepend an H1 heading generated from the provided title.
   */
  title?: string;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function toText(node: Nodes): string {
  return mdastToTextSync(node, {
    keep: ['code', 'tableCell'],
    includeImageAlt: true,
    includeHtml: false,
  });
}

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
 * //     parent: null,
 * //     content: 'Introduction'
 * //   },
 * //   {
 * //     id: 'heading',
 * //     text: 'Heading',
 * //     depth: 2,
 * //     parent: {
 * //       id: 'awesome-title',
 * //       text: 'Awesome Title',
 * //       depth: 1,
 * //       parent: null,
 * //       content: 'Introduction'
 * //     },
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
    .use(remarkHeadingFromTitle, { title: options?.title });
  const tree = (await processor.run(processor.parse(markdown))) as Root;
  const headings: VMarkdownHeading[] = [];

  let vMarkdownHeading: (VMarkdownHeading & { content: string }) | null = null;

  function walk(node: Nodes): void {
    if (node.type === 'heading') {
      const lastChildNode = node.children.at(-1);

      if (!lastChildNode || lastChildNode.type !== 'text') {
        throw new Error(
          `Heading "${toText(node)}" at line ${node.position?.start.line} needs an explicit custom ID`,
        );
      }

      const match = customHeadingIdRegex.exec(lastChildNode.value);

      if (!match || !match.groups) {
        throw new Error(
          `Heading "${toText(node)}" at line ${node.position?.start.line} needs an explicit custom ID`,
        );
      }

      lastChildNode.value = lastChildNode.value.slice(0, match.index);

      /*
       * Find the parent heading for the current heading.
       * A heading at the same or deeper depth cannot be its parent,
       * so keep walking up through `parent` until reaching a shallower heading.
       *
       * Example:
       *   # A        (depth 1)
       *   ## B       (depth 2, parent: A)
       *   ### C      (depth 3, parent: B)
       *   ## D       (depth 2)
       *
       * When processing D, `vMarkdownHeading` initially points to C.
       *   C(depth 3) >= D(depth 2) → move to B
       *   B(depth 2) >= D(depth 2) → move to A
       *   A(depth 1) <  D(depth 2) → stop
       *
       * Therefore, A becomes the parent of D.
       */
      while (vMarkdownHeading && vMarkdownHeading.depth >= node.depth) {
        vMarkdownHeading = vMarkdownHeading.parent ?? null;
      }

      headings.push(
        (vMarkdownHeading = {
          id: match.groups.id,
          text: toText(node),
          depth: node.depth,
          parent: vMarkdownHeading ?? null,
          content: '',
        }),
      );

      return;
    }

    if (
      node.type === 'paragraph' ||
      node.type === 'tableCell' ||
      node.type === 'code' ||
      node.type === 'math'
    ) {
      if (!vMarkdownHeading) {
        return;
      }

      const value = toText(node)
        .replace(/[^\S\n]+/g, ' ')
        .trim();

      if (!value) {
        return;
      }

      vMarkdownHeading.content += `${vMarkdownHeading.content ? ' ' : ''}${value}`;

      return;
    }

    if ('children' in node) {
      node.children.forEach(walk);
    }
  }

  walk(tree);

  return headings;
}
