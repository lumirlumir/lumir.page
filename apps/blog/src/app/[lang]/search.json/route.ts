/**
 * @fileoverview Static search documents for each language.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { langKeys, type LangKey } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Change the dynamic behavior of a layout or page to fully static or fully dynamic.
 * @see https://nextjs.org/docs/app/guides/caching-without-cache-components#dynamic
 */
export const dynamic = 'force-static';

/**
 * Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams
 */
export const dynamicParams = false;

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export function generateStaticParams(): Awaited<
  RouteContext<'/[lang]/search.json'>['params']
>[] {
  return langKeys.map(lang => ({ lang }));
}

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 */
export async function GET(
  _request: Request,
  { params }: RouteContext<'/[lang]/search.json'>,
) {
  const awaitParams = await params;
  const lang = awaitParams.lang as LangKey;

  return Response.json(
    await Promise.all(
      markdownCollection.ids
        .filter(id => id.endsWith(lang))
        .map(id => markdownCollection.loadVMarkdownFileMetaWithHeadings(id)),
    ),
  );
}
