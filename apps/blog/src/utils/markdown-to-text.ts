/**
 * @fileoverview Defines the helper functions for converting markdown content to plain text.
 * @see https://github.com/syntax-tree/mdast-util-to-string#readme (`mdast-util-to-string`)
 * @see https://github.com/remarkjs/remark-gfm#readme (`remark-gfm`)
 * @see https://github.com/remarkjs/remark-math#readme (`remark-math`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { mdastToText, mdastToTextSync } from '@/utils/mdast-to-text';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content, including GFM and math, to plain text asynchronously using `unified` with `remark`.
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
  return mdastToText(processor.parse(markdown));
}

/**
 * Converts markdown content, including GFM and math, to plain text synchronously using `unified` with `remark`.
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
  return mdastToTextSync(processor.parse(markdown));
}
