/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import PostCard from '@/components/article/post-card';
import PostList from '@/components/article/post-list';
import { type CategoryKey } from '@/data/category';
import { type LangKey } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';

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
  Awaited<PageProps<'/[lang]/categories/[category]'>['params']>[]
> {
  return markdownCollection.nonEmptyCategoryKeys.map(category => ({
    lang: 'ko', // TODO: Support multiple languages.
    category,
  }));
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({
  params,
}: PageProps<'/[lang]/categories/[category]'>) {
  const { category, lang } = await params;
  const vMarkdownFileMetas = markdownCollection.category[category as CategoryKey];

  return (
    <PostList
      items={vMarkdownFileMetas.map(vMarkdownFileMeta => ({
        vMarkdownFileMeta,
        postCard: (
          <PostCard lang={lang as LangKey} vMarkdownFileMeta={vMarkdownFileMeta} />
        ),
      }))}
    />
  );
}
