/**
 * @fileoverview `sitemap.xml` generator for localized routes (e.g. `/[lang]`, `/[lang]/posts/*`, and `/[lang]/categories/*`).
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { langKeys } from '@/data/lang';
import { websiteUrl } from '@/data/site';
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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // `/` path
    ...langKeys.map(lang => ({
      url: `${websiteUrl}/${lang}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),

    // `/posts` path
    ...langKeys.flatMap(lang =>
      Object.values(markdownCollection.byLangSlug[lang]).map(
        ({ slug, data: { updated } }) => ({
          url: `${websiteUrl}/${lang}/posts/${slug}`,
          lastModified: updated,
          changeFrequency: 'monthly' as const,
          priority: 1.0,
        }),
      ),
    ),

    // `/categories` path
    ...langKeys.flatMap(lang =>
      markdownCollection.nonEmptyCategoryKeys[lang].map(categoryKey => ({
        url: `${websiteUrl}/${lang}/categories/${categoryKey}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ),
  ];
}
