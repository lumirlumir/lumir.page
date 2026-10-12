/**
 * @fileoverview Defines the helper functions for converting mdast nodes to plain text.
 * @see https://github.com/syntax-tree/hast-util-to-text#readme (`hast-util-to-text`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/syntax-tree/mdast-util-to-hast#readme (`mdast-util-to-hast`)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { toText } from 'hast-util-to-text';
import type { Image, ImageReference, LinkReference, ListItem, Nodes, Root } from 'mdast';
import { defaultHandlers } from 'mdast-util-to-hast';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const processor = unified().use(remarkRehype, {
  handlers: {
    // Omit the HTML formatting newline after `<br>`, which `toText` turns into a space.
    break: () => ({ type: 'element', tagName: 'br', properties: {}, children: [] }),
    // Use image alt text as plain text, omitting images with empty alt text.
    image: (_, node: Image) => (node.alt ? { type: 'text', value: node.alt } : []),
    // Use reference image alt text without requiring the image definition.
    imageReference: (_, node: ImageReference) =>
      node.alt ? { type: 'text', value: node.alt } : [],
    // Convert reference link children without requiring the link definition.
    linkReference: (state, node: LinkReference) => state.all(node),
    // Omit task checkboxes using a shallow copy without modifying the original node.
    listItem: (state, node: ListItem, parent) =>
      defaultHandlers.listItem(state, { ...node, checked: null }, parent),
  },
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts an mdast node to plain text asynchronously without modifying the original node.
 * @param node The mdast node to convert, including a complete root tree.
 * @returns The extracted plain text.
 */
export async function mdastToText(node: Nodes): Promise<string> {
  const tree: Root = node.type === 'root' ? node : { type: 'root', children: [node] };

  return toText(await processor.run(tree));
}

/**
 * Converts an mdast node to plain text synchronously without modifying the original node.
 * @param node The mdast node to convert, including a complete root tree.
 * @returns The extracted plain text.
 */
export function mdastToTextSync(node: Nodes): string {
  const tree: Root = node.type === 'root' ? node : { type: 'root', children: [node] };

  return toText(processor.runSync(tree));
}
