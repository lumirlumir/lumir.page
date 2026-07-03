/**
 * @fileoverview remark-custom-heading-id.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * - We don't use the `[ \t]*$` pattern at the end of the regex because trailing
 *   whitespace is already removed from a `heading` node's child `text` node.
 */
const customHeadingIdRegex = /[ \t]+{#(?<id>[^}]+)}$/;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin to support custom heading IDs in Markdown.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import remarkParse from 'remark-parse';
 * import remarkRehype from 'remark-rehype';
 * import rehypeStringify from 'rehype-stringify';
 * import { remarkCustomHeadingId } from '@lumir/remark-plugins';
 *
 * const file = await unified()
 *   .use(remarkParse)
 *   .use(remarkCustomHeadingId)
 *   .use(remarkRehype)
 *   .use(rehypeStringify)
 *   .process('# Heading {#custom-id}');
 *
 * console.log(file.value); // Output: '<h1 id="custom-id">Heading</h1>'
 * ```
 */
export function remarkCustomHeadingId() {
  return (tree: Root) => {
    visit(tree, 'heading', node => {
      /*
       * Instead of using deep recursive traversal to find the final `text` node,
       * we simply access the node's last child directly with shallow traversal.
       *
       * This is because in the "Not OK" case, the `text` node is located
       * in the last position while DFS(Depth First Search) traversal,
       * but is located under `emphasis` or `strong` nodes.
       *
       * This is the situation we don't want to support.
       * There must be pure ` #{custom-id}` text at the end of the heading
       * without being wrapped by other nodes.
       *
       * OK:
       *
       * ```md
       * # heading {#custom-id}
       * ```
       *
       * Not OK:
       *
       * ```md
       * # heading *{#custom-id}*
       *           ^            ^
       *
       * # heading **{#custom-id}**
       *           ^^            ^^
       * ```
       */
      const textNode = node.children.at(-1);

      // If the last child node is not a `text` node, skip it.
      if (textNode?.type !== 'text') {
        return;
      }

      const match = customHeadingIdRegex.exec(textNode.value);

      if (!match || !match.groups) {
        return;
      }

      const { id } = match.groups;

      // Transform the `text` node's value by removing the matched custom ID part.
      textNode.value = textNode.value.slice(0, match.index);

      // Transform the `heading` node's data by adding the custom ID.
      node.data ??= {};

      const hProperties =
        typeof node.data.hProperties === 'object' && node.data.hProperties !== null
          ? node.data.hProperties
          : {};

      node.data.hProperties = { ...hProperties, id };
    });
  };
}
