/**
 * @fileoverview Defines the helper functions for converting mdast nodes to plain text.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Nodes, Root } from 'mdast';
import { toString, type Options as MdastUtilToStringOptions } from 'mdast-util-to-string';
import stripMarkdown, { type Options as StripMarkdownOptions } from 'strip-markdown';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts an mdast node to plain text asynchronously without modifying the original node.
 * @param node The mdast node to convert, including a complete root tree.
 * @param options Options for stripping and text extraction.
 * @returns The extracted plain text.
 */
export async function mdastToText(
  node: Nodes,
  options?: MdastUtilToStringOptions & StripMarkdownOptions,
): Promise<string> {
  const processor = unified().use(stripMarkdown, {
    ...(options?.keep !== undefined ? { keep: options.keep } : {}),
    ...(options?.remove !== undefined ? { remove: options.remove } : {}),
  });
  const clonedNode = structuredClone(node);
  const tree: Root =
    clonedNode.type === 'root' ? clonedNode : { type: 'root', children: [clonedNode] };

  return toString(await processor.run(tree), {
    ...(options?.includeImageAlt !== undefined
      ? { includeImageAlt: options.includeImageAlt }
      : {}),
    ...(options?.includeHtml !== undefined ? { includeHtml: options.includeHtml } : {}),
  });
}

/**
 * Converts an mdast node to plain text synchronously without modifying the original node.
 * @param node The mdast node to convert, including a complete root tree.
 * @param options Options for stripping and text extraction.
 * @returns The extracted plain text.
 */
export function mdastToTextSync(
  node: Nodes,
  options?: MdastUtilToStringOptions & StripMarkdownOptions,
): string {
  const processor = unified().use(stripMarkdown, {
    ...(options?.keep !== undefined ? { keep: options.keep } : {}),
    ...(options?.remove !== undefined ? { remove: options.remove } : {}),
  });
  const clonedNode = structuredClone(node);
  const tree: Root =
    clonedNode.type === 'root' ? clonedNode : { type: 'root', children: [clonedNode] };

  return toString(processor.runSync(tree), {
    ...(options?.includeImageAlt !== undefined
      ? { includeImageAlt: options.includeImageAlt }
      : {}),
    ...(options?.includeHtml !== undefined ? { includeHtml: options.includeHtml } : {}),
  });
}
