/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import { type LangKey } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { markdownToText } from '@/utils/markdown-to-text';
import { AUTHOR, GITHUB_AUTHOR_URL } from '@/constants';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams
 */
export const dynamicParams = false;

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams(): Promise<
  Awaited<PageProps<'/[lang]/posts/[markdown]'>['params']>[]
> {
  return Object.entries(markdownCollection.byLangSlug).flatMap(([lang, bySlug]) =>
    Object.keys(bySlug).map(slug => ({
      lang,
      markdown: slug,
    })),
  );
}

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[lang]/posts/[markdown]'>): Promise<Metadata> {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;
  const markdown = awaitedParams.markdown satisfies string;
  const id = `${markdown}.${lang}` as const;
  const {
    data: { title, description, categories },
  } = await markdownCollection.loadVMarkdownFileMeta(id);

  return {
    title: await markdownToText(title),
    description: await markdownToText(description),
    keywords: categories,
    authors: [
      {
        name: AUTHOR[lang],
        url: GITHUB_AUTHOR_URL,
      },
    ],
    applicationName: 'TODO',
    generator: 'TODO',
    themeColor: 'TODO',
    // @ts-expect-error -- TODO
    colorScheme: 'TODO',
    creator: 'TODO',
    publisher: 'TODO',
    robots: 'TODO',
    // @ts-expect-error -- TODO
    alternates: 'TODO',
    // TODO: 다른 메타데이터 필드들도 추가하기.
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]/posts/[markdown]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;
  const markdown = awaitedParams.markdown satisfies string;
  const id = `${markdown}.${lang}` as const;
  const {
    content,
    data: { title, references },
    slug,
  } = await markdownCollection.loadVMarkdownFile(id);

  return (
    <>
      <div
        className="markdown-body"
        // eslint-disable-next-line react/no-danger -- Safe because the content comes from the local file and is controlled.
        dangerouslySetInnerHTML={{
          __html: await markdownToHtml(content, { title: `${title} {#${slug}}` }),
        }}
      />
      {references.length > 0 && ( // TODO: Make a dedicated component for this after we decide on the design.
        <div className="markdown-body">
          <br />
          <h2>Reference</h2>
          <ul>
            {references.map(reference => (
              <li key={reference}>
                <a href={reference}>{reference}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
