/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import PostCard from '@/components/article/post-card';
import PostList from '@/components/article/post-list';
import { type CategoryKey } from '@/data/category';
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
  Awaited<PageProps<'/categories/[category]'>['params']>[]
> {
  return markdownCollection.nonEmptyCategoryKeys.map(category => ({
    category,
  }));
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/categories/[category]'>) {
  const { category } = await params;
  const vMarkdownFileMetas = markdownCollection.category[category as CategoryKey];

  return (
    <PostList
      items={vMarkdownFileMetas.map(vMarkdownFileMeta => ({
        vMarkdownFileMeta,
        postCard: <PostCard vMarkdownFileMeta={vMarkdownFileMeta} />,
      }))}
    />
  );
}
