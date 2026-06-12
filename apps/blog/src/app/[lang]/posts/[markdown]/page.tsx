/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { markdownToText } from '@/utils/markdown-to-text';

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
  return Object.keys(markdownCollection.slug).flatMap(slug => ({
    lang: 'ko', // TODO: Support multiple languages after we decide on the design.
    markdown: slug,
  }));
}

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[lang]/posts/[markdown]'>): Promise<Metadata> {
  const { markdown } = await params;
  const {
    data: { title, description },
  } = await markdownCollection.loadVMarkdownFileMeta(markdown);

  return {
    title: await markdownToText(title),
    description: await markdownToText(description),
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]/posts/[markdown]'>) {
  const { markdown } = await params;
  const {
    content,
    data: { title, references },
    slug,
  } = await markdownCollection.loadVMarkdownFile(markdown);

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
