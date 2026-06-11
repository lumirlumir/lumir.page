/**
 * @fileoverview `robots.txt` generator.
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

export default function robots(): MetadataRoute.Robots {
  const SITEMAP = 'sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      `${WEBSITE_URL}/${SITEMAP}`,
      `${WEBSITE_URL}/posts/${SITEMAP}`,
      `${WEBSITE_URL}/categories/${SITEMAP}`,
    ],
  };
}
