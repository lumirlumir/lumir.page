/**
 * @fileoverview rehype-image-url-replace.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `rehypeImageUrlReplace` plugin.
 */
export interface RehypeImageUrlReplaceOptions {
  /**
   * A regular expression to search for in image URLs.
   * The `y` flag will be ignored if present.
   */
  searchValue: RegExp;

  /**
   * A string to replace the matched portion of the image URL.
   */
  replaceValue: string;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const yFlagRegex = /y/g;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A rehype plugin to replace image URLs in HTML content based on a provided regular expression and replacement string.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import rehypeParse from 'rehype-parse';
 * import rehypeStringify from 'rehype-stringify';
 * import { rehypeImageUrlReplace } from '@lumir/rehype-plugins';
 *
 * const file = await unified()
 *   .use(rehypeParse, { fragment: true })
 *   .use(rehypeImageUrlReplace, {
 *     searchValue: /^http:\/\//,
 *     replaceValue: 'https://',
 *   })
 *   .use(rehypeStringify)
 *   .process('<img src="http://example.com/image.png">');
 *
 * console.log(file.value); // Output: '<img src="https://example.com/image.png">'
 * ```
 */
export function rehypeImageUrlReplace({
  searchValue,
  replaceValue,
}: RehypeImageUrlReplaceOptions) {
  const sanitizedSearchValue = new RegExp(
    searchValue.source,
    searchValue.flags.replace(yFlagRegex, ''),
  );

  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (
        node.tagName === 'img' &&
        sanitizedSearchValue.test(node.properties?.src as string)
      ) {
        node.properties = {
          ...node.properties,
          src: (node.properties?.src as string).replace(
            sanitizedSearchValue,
            replaceValue,
          ),
        };
      }
    });
  };
}
