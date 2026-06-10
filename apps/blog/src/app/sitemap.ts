/**
 * @fileoverview `sitemap.xml` generator for path `/`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';

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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
