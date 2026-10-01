/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import Link from 'next/link';
import { categoryMeta } from '@/data/category';
import { type LangKey } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { markdownToText } from '@/utils/markdown-to-text';
import styles from './page.module.css';

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
    data: { title, description },
  } = await markdownCollection.loadVMarkdownFileMeta(id);

  return {
    title: await markdownToText(title),
    description: await markdownToText(description),
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
    data: { categories, created, description, references, title, updated },
    slug,
  } = await markdownCollection.loadVMarkdownFile(id);
  const [plainTitle, plainDescription] = await Promise.all([
    markdownToText(title),
    markdownToText(description),
  ]);
  const primaryCategory = categories[0];

  return (
    <div className={styles.post} data-page="post">
      <header className={styles.masthead}>
        <div className={styles.rail}>
          <span>JOURNAL ENTRY · {created.slice(0, 4)}</span>
          <span>READ / RECORD / RETURN</span>
        </div>
        {primaryCategory ? (
          <Link href={`/${lang}/categories/${primaryCategory}`}>
            {categoryMeta[primaryCategory].name.en} /{' '}
            {categoryMeta[primaryCategory].name[lang]}
          </Link>
        ) : null}
        <h1 id={slug}>{plainTitle}</h1>
        <p>{plainDescription}</p>
        <dl>
          <div>
            <dt>WRITTEN BY</dt>
            <dd>LUMIR</dd>
          </div>
          <div>
            <dt>PUBLISHED</dt>
            <dd>{created}</dd>
          </div>
          <div>
            <dt>UPDATED</dt>
            <dd>{updated}</dd>
          </div>
        </dl>
      </header>

      <figure className={styles.lead}>
        <img src="/images/editorial/placeholder.webp" width={1536} height={1024} alt="" />
        <figcaption>
          <span>EDITORIAL PLATE · 01</span>
          <span>LUMIR DEV JOURNAL</span>
        </figcaption>
      </figure>

      <div className={styles.prose}>
        <div
          className="markdown"
          // eslint-disable-next-line react/no-danger -- Safe because the content comes from the local file and is controlled.
          dangerouslySetInnerHTML={{ __html: await markdownToHtml(content) }}
        />
        {references.length > 0 && (
          <div className="markdown">
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
      </div>
    </div>
  );
}
