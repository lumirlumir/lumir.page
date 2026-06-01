/**
 * @fileoverview remark-heading-from-title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Heading, Root } from 'mdast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `remarkHeadingFromTitle` plugin.
 */
export interface RemarkHeadingFromTitleOptions {
  /**
   * The title to generate the H1 heading from.
   * If not provided or an empty string, the plugin will not prepend any heading.
   */
  title?: string | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin to prepend an H1 heading generated from the provided title.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import remarkParse from 'remark-parse';
 * import remarkStringify from 'remark-stringify';
 * import { remarkHeadingFromTitle } from '@lumir/remark-plugins';
 *
 * const file = await unified()
 *   .use(remarkParse)
 *   .use(remarkHeadingFromTitle, { title: 'title' })
 *   .use(remarkStringify)
 *   .process('paragraph');
 *
 * console.log(file.value); // Output: '# title\n\nparagraph'
 * ```
 */
export function remarkHeadingFromTitle(options?: RemarkHeadingFromTitleOptions) {
  const { title } = options ?? {};

  if (typeof title !== 'string' || title === '') {
    return () => {};
  }

  return (tree: Root) => {
    tree.children.unshift(
      // Prepend an H1 heading generated from the provided title.
      fromMarkdown(`# ${title}`).children[0] as Heading,
    );
  };
}
