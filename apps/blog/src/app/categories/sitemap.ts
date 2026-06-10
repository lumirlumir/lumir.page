/**
 * @fileoverview `sitemap.xml` generator for path `/categories`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import createMarkdownCollection from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Change the dynamic behavior of a layout or page to fully static or fully dynamic.
 * @see https://nextjs.org/docs/app/guides/caching-without-cache-components#dynamic
 */
export const dynamic = 'force-static';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return markdownCollection.nonEmptyCategoryKeys.map(categoryKey => ({
    url: `${WEBSITE_URL}/categories/${categoryKey}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
