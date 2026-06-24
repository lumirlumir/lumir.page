/**
 * @fileoverview Defines a type guard for Markdown frontmatter data.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { categoryKeys } from '@/data/category';
import type { Frontmatter } from '@/data/frontmatter';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Type guard to check if the given data conforms to the `Frontmatter` interface.
 * @param data The data to check for conformity to the `Frontmatter` interface.
 * @example
 * ```ts
 * import { isFrontmatter } from '@/utils/is-frontmatter';
 *
 * const data: unknown = {
 *   title: 'My Blog Post',
 *   description: 'A brief description of my blog post.',
 *   created: '2024-01-01',
 *   updated: '2024-01-02',
 *   categories: ['javascript', 'markdown'],
 *   references: ['https://example.com/reference1', 'https://example.com/reference2'],
 * };
 *
 * if (isFrontmatter(data)) {
 *   // TypeScript now knows `data` is of type `Frontmatter`
 *   console.log(data.title); // This is safe to access
 * } else {
 *   console.error('Data does not conform to Frontmatter structure.');
 * }
 * ```
 */
export function isFrontmatter(data: unknown): data is Frontmatter {
  return (
    // check `object`
    typeof data === 'object' &&
    data !== null &&
    // check `title`
    'title' in data &&
    typeof data.title === 'string' &&
    // check `description`
    'description' in data &&
    typeof data.description === 'string' &&
    // check `created`
    'created' in data &&
    typeof data.created === 'string' &&
    // check `updated`
    'updated' in data &&
    typeof data.updated === 'string' &&
    // check `categories`
    'categories' in data &&
    Array.isArray(data.categories) &&
    data.categories.every(category => categoryKeys.includes(category)) &&
    // check `references`
    'references' in data &&
    Array.isArray(data.references) &&
    data.references.every(reference => typeof reference === 'string')
  );
}
