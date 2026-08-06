/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { PostCard } from '@/components/article/post-card';
import { PostList } from '@/components/article/post-list';
import { categoryMeta, type CategoryKey } from '@/data/category';
import { type LangKey, type LangRecord } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToTextSync } from '@/utils/markdown-to-text';
import styles from './page.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();

const dictionary = {
  ko: {
    eyebrow: 'TOPIC ARCHIVE',
    title: '주제별 기록',
    description: '하나의 기술을 여러 시선으로 읽고, 시행착오와 발견을 함께 모았습니다.',
    entries: '개의 글',
    folio: '분류된 기술 노트',
  },
  en: {
    eyebrow: 'TOPIC ARCHIVE',
    title: 'Notes by subject',
    description:
      'A collected reading of one technology through its experiments, failures, and discoveries.',
    entries: 'entries',
    folio: 'CLASSIFIED TECHNICAL NOTES',
  },
} as const satisfies LangRecord<{
  eyebrow: string;
  title: string;
  description: string;
  entries: string;
  folio: string;
}>;

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
  Awaited<PageProps<'/[lang]/categories/[category]'>['params']>[]
> {
  return Object.entries(markdownCollection.nonEmptyCategoryKeys).flatMap(
    ([lang, categories]) =>
      categories.map(category => ({
        lang,
        category,
      })),
  );
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({
  params,
}: PageProps<'/[lang]/categories/[category]'>) {
  const awaitedParams = await params;
  const category = awaitedParams.category as CategoryKey;
  const lang = awaitedParams.lang as LangKey;

  const vMarkdownFileMetas = markdownCollection.byLangCategory[lang][category];
  const copy = dictionary[lang];
  const categoryName = categoryMeta[category].name;

  return (
    <div className={styles.category} data-page="category">
      <header className={styles.masthead}>
        <div className={styles.rail}>
          <span>{copy.eyebrow}</span>
          <span>
            {String(vMarkdownFileMetas.length).padStart(2, '0')} {copy.entries}
          </span>
        </div>
        <p>{categoryName.en} / INDEX</p>
        <h1>
          <span>{copy.title}</span>
          <strong>{categoryName[lang]}</strong>
        </h1>
        <p className={styles.description}>{copy.description}</p>
        <div className={styles.folio}>
          <span>ARCHIVE · {category.toUpperCase()}</span>
          <span>{copy.folio}</span>
          <span>SEOUL · 2026</span>
        </div>
      </header>

      <section className={styles.collection} aria-label={categoryName[lang]}>
        <PostList
          items={vMarkdownFileMetas.map(vMarkdownFileMeta => ({
            vMarkdownFileMeta: {
              ...vMarkdownFileMeta,
              data: {
                ...vMarkdownFileMeta.data,
                // Keep markdown parsing on the server. Convert the title to plain text here so
                // sorting uses the rendered text without pulling markdown utilities into the client.
                title: markdownToTextSync(vMarkdownFileMeta.data.title),
              },
            },
            postCard: (
              <PostCard
                lang={lang}
                marker={categoryName.en}
                variant="archive"
                vMarkdownFileMeta={vMarkdownFileMeta}
              />
            ),
          }))}
          lang={lang}
        />
      </section>
    </div>
  );
}
