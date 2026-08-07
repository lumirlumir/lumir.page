/**
 * @fileoverview Defines the helper functions for converting markdown content to plain text.
 * @see https://github.com/syntax-tree/mdast-util-to-string#readme (`mdast-util-to-string`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/strip-markdown (`strip-markdown`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import stripMarkdown from 'strip-markdown';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const processor = unified().use(remarkParse).use(stripMarkdown);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to plain text asynchronously using `unified` with `remark`.
 * @param markdown The markdown content to convert.
 * @example
 * ```ts
 * import { markdownToText } from '@/utils/markdown-to-text';
 *
 * const markdown = '# Hello World. This is a **markdown** document.';
 * const text = await markdownToText(markdown);
 * console.log(text); // Output: "Hello World. This is a markdown document."
 * ```
 */
export async function markdownToText(markdown: string): Promise<string> {
  const tree = await processor.run(processor.parse(markdown));

  return toString(tree);
}

/**
 * Converts markdown content to plain text synchronously using `unified` with `remark`.
 * @param markdown The markdown content to convert.
 * @example
 * ```ts
 * import { markdownToTextSync } from '@/utils/markdown-to-text';
 *
 * const markdown = '# Hello World. This is a **markdown** document.';
 * const text = markdownToTextSync(markdown);
 * console.log(text); // Output: "Hello World. This is a markdown document."
 * ```
 */
export function markdownToTextSync(markdown: string): string {
  const tree = processor.runSync(processor.parse(markdown));

  return toString(tree);
}
