/**
 * @fileoverview rehype-image-lazy-loading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A rehype plugin to add lazy loading to images in HTML content.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import rehypeParse from 'rehype-parse';
 * import rehypeStringify from 'rehype-stringify';
 * import { rehypeImageLazyLoading } from '@lumir/rehype-plugins';
 *
 * const file = await unified()
 *   .use(rehypeParse, { fragment: true })
 *   .use(rehypeImageLazyLoading)
 *   .use(rehypeStringify)
 *   .process('<img src="http://example.com/image.png">');
 *
 * console.log(file.value); // Output: '<img src="http://example.com/image.png" loading="lazy">'
 * ```
 */
export function rehypeImageLazyLoading() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'img' && !node.properties?.loading) {
        node.properties = {
          ...node.properties,
          loading: 'lazy',
        };
      }
    });
  };
}
