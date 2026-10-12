/**
 * @fileoverview Defines the helper functions for converting markdown content to plain text.
 * @see https://github.com/syntax-tree/hast-util-to-text#readme (`hast-util-to-text`)
 * @see https://github.com/remarkjs/remark-gfm#readme (`remark-gfm`)
 * @see https://github.com/remarkjs/remark-math#readme (`remark-math`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 * @see https://github.com/syntax-tree/unist-util-visit#readme (`unist-util-visit`)
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { toText } from 'hast-util-to-text';
import type { Root } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(() => (tree: Root) => {
    // Omit task checkboxes before HTML conversion to avoid their separator spaces.
    visit(tree, 'listItem', node => {
      node.checked = null;
    });
  })
  .use(remarkRehype, {
    handlers: {
      // Omit the HTML formatting newline after `<br>`, which `toText` turns into a space.
      break: () => ({ type: 'element', tagName: 'br', properties: {}, children: [] }),
    },
  });

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content, including GFM and math, to plain text asynchronously
 * using `unified` with `remark` and `rehype`.
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

  return toText(tree);
}

/**
 * Converts markdown content, including GFM and math, to plain text synchronously
 * using `unified` with `remark` and `rehype`.
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

  return toText(tree);
}
