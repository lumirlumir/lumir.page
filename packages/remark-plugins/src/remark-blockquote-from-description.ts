/**
 * @fileoverview remark-blockquote-from-description.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Blockquote, Root } from 'mdast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `remarkBlockquoteFromDescription` plugin.
 */
export interface RemarkBlockquoteFromDescriptionOptions {
  /**
   * The description to generate the blockquote from.
   * If not provided or an empty string, the plugin will not prepend any blockquote.
   */
  description?: string | undefined;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Matches a CommonMark line ending, treating CRLF as a single line ending.
 * @see https://spec.commonmark.org/0.31.2/#line-ending
 */
const lineEndingRegex = /\r\n|[\r\n]/u;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin to prepend a blockquote generated from the provided description.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import remarkParse from 'remark-parse';
 * import remarkStringify from 'remark-stringify';
 * import { remarkBlockquoteFromDescription } from '@lumir/remark-plugins';
 *
 * const file = await unified()
 *   .use(remarkParse)
 *   .use(remarkBlockquoteFromDescription, { description: 'description' })
 *   .use(remarkStringify)
 *   .process('paragraph');
 *
 * console.log(file.value); // Output: '> description\n\nparagraph'
 * ```
 */
export function remarkBlockquoteFromDescription(
  options?: RemarkBlockquoteFromDescriptionOptions,
) {
  const { description } = options ?? {};

  if (typeof description !== 'string' || description === '') {
    return () => {};
  }

  return (tree: Root) => {
    tree.children.unshift(
      // Prepend a blockquote generated from the provided description.
      fromMarkdown(`> ${description.split(lineEndingRegex).join('\n> ')}`)
        .children[0] as Blockquote,
    );
  };
}
