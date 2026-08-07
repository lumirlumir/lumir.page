/**
 * @fileoverview Compares markdown documents.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type SortableFrontmatterKey } from '@/data/frontmatter';
import { type LangKey } from '@/data/lang';
import { type SortKey } from '@/data/sort';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Returns a comparison function for sorting markdown documents based on the specified field and sort direction.
 */
export function compareMarkdownDocument(
  field: SortableFrontmatterKey,
  sort: SortKey,
  lang: LangKey,
) {
  switch (field) {
    case 'title': {
      return (a: VMarkdownFileMeta, b: VMarkdownFileMeta) => {
        const titleA = a.data.title.toLowerCase(); // Case insensitive.
        const titleB = b.data.title.toLowerCase(); // Case insensitive.

        return sort === 'asc'
          ? titleA.localeCompare(titleB, lang) // Ascending.
          : titleB.localeCompare(titleA, lang); // Descending.
      };
    }
    case 'created':
    case 'updated': {
      return (a: VMarkdownFileMeta, b: VMarkdownFileMeta) => {
        const dateA = new Date(a.data[field]);
        const dateB = new Date(b.data[field]);

        // NaN check for invalid dates
        if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
          throw new TypeError('Invalid date format.');
        }

        return sort === 'asc'
          ? dateA.getTime() - dateB.getTime() // Ascending.
          : dateB.getTime() - dateA.getTime(); // Descending.
      };
    }
    default: {
      throw new TypeError('Invalid field. Use "title", "created", or "updated".');
    }
  }
}
