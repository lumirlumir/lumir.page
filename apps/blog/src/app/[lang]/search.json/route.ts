/**
 * @fileoverview Static search documents for each language.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { langKeys, type LangKey } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToHeading } from '@/utils/markdown-to-heading';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): Awaited<
  RouteContext<'/[lang]/search.json'>['params']
>[] {
  return langKeys.map(lang => ({ lang }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<'/[lang]/search.json'>,
) {
  const { lang } = await params;
  const collection = createMarkdownCollection();
  const documents = await Promise.all(
    Object.values(collection.byLangSlug[lang as LangKey]).map(async metadata => {
      const file = await collection.loadVMarkdownFile(metadata.id);
      const headings = await markdownToHeading(file.content, {
        title: `${metadata.data.title} {#${metadata.slug}}`,
      });

      return { ...metadata, headings };
    }),
  );

  return Response.json(documents);
}
