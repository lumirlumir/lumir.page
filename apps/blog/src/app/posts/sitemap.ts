/**
 * @fileoverview `sitemap.xml` generator for path `/posts`.
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
  return Object.values(markdownCollection.slug).map(({ slug, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${slug}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
