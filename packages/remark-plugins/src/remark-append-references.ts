/**
 * @fileoverview remark-append-references.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ListItem, Root } from 'mdast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface RemarkAppendReferencesOptions {
  /**
   * The reference URLs, in display order. An empty list omits the section.
   */
  references?: readonly string[] | undefined;

  /**
   * The plain-text heading displayed above the list.
   * @default "References"
   */
  referencesHeading?: string | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin that appends an H2 with the stable ID `references`
 * and a list of reference links.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import remarkParse from 'remark-parse';
 * import remarkStringify from 'remark-stringify';
 * import { remarkAppendReferences } from '@lumir/remark-plugins';
 *
 * const file = await unified()
 *   .use(remarkParse)
 *   .use(remarkAppendReferences, {
 *     references: ['https://example.com'],
 *     referencesHeading: '참고 링크',
 *   })
 *   .use(remarkStringify)
 *   .process('paragraph');
 *
 * console.log(file.value); // Output: 'paragraph\n\n## 참고 링크\n\n* <https://example.com>\n'
 * ```
 */
export function remarkAppendReferences({
  references,
  referencesHeading = 'References',
}: RemarkAppendReferencesOptions = {}) {
  if (!references?.length) {
    return () => {};
  }

  return (tree: Root) => {
    tree.children.push(
      {
        type: 'heading',
        depth: 2,
        data: { hProperties: { id: 'references' } },
        children: [{ type: 'text', value: referencesHeading }],
      },
      {
        type: 'list',
        ordered: false,
        children: references.map((url): ListItem => ({
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'link', url, children: [{ type: 'text', value: url }] }],
            },
          ],
        })),
      },
    );
  };
}
