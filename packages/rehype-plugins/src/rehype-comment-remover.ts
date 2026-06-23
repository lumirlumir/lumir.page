/**
 * @fileoverview rehype-comment-remover.
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
 * A rehype plugin to remove HTML comments from HTML content.
 * @example
 *
 * ```ts
 * import { rehype } from 'rehype';
 * import { rehypeCommentRemover } from '@lumir/rehype-plugins';
 *
 * const file = await rehype().use(rehypeCommentRemover).process('<p>Hello<!-- secret --> World</p>');
 *
 * console.log(file.value); // Output: '<p>Hello World</p>'
 * ```
 */
export function rehypeCommentRemover() {
  return (tree: Root) => {
    visit(tree, 'comment', (_, index, parent) => {
      if (index !== undefined && parent) {
        // Delete the current comment node from its parent's children array.
        parent.children.splice(index, 1);

        // Continue traversal from the same index, because the next sibling shifted into this position.
        return index;
      }

      // Continue normal traversal when the visitor cannot safely remove the node.
      return undefined;
    });
  };
}
