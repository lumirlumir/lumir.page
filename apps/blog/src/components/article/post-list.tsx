/**
 * @fileoverview post-list.
 *
 * NOTE: We use `Suspense` instead of `useEffect` to reduce visual jump.
 * With `useEffect`, the default post list is painted first,
 * and the search-param-based sort is applied afterward when the effect runs.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useSearchParams } from 'next/navigation';
import { Fragment, Suspense, type ReactNode } from 'react';
import { type SortableFrontmatterKey } from '@/data/frontmatter';
import { type PropsWithLang } from '@/data/lang';
import { type SortKey } from '@/data/sort';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import { compareMarkdownDocument } from '@/utils/compare';
import styles from './post-list.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `PostList` component.
 */
interface PostListProps {
  /**
   * The list of items to be displayed in the post list.
   */
  readonly items: readonly {
    /**
     * `VMarkdownFileMeta` object.
     */
    readonly vMarkdownFileMeta: VMarkdownFileMeta;

    /**
     * The `PostCard` component to be rendered for each item in the list.
     */
    readonly postCard: ReactNode;
  }[];
}

/**
 * Props for the `SortedPostList` component.
 */
interface SortedPostListProps extends PostListProps {
  /**
   * The field by which the posts should be sorted.
   */
  readonly field: SortableFrontmatterKey;

  /**
   * The sort direction applied to the posts.
   */
  readonly sort: SortKey;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const DEFAULT_FIELD = 'updated' satisfies SortableFrontmatterKey;
const DEFAULT_SORT = 'desc' satisfies SortKey;

function normalizeField(field: string | null): SortableFrontmatterKey {
  return field === 'title' || field === 'created' || field === 'updated'
    ? field
    : DEFAULT_FIELD;
}

function normalizeSort(sort: string | null): SortKey {
  return sort === 'asc' || sort === 'desc' ? sort : DEFAULT_SORT;
}

function SortedPostList({
  items,
  field,
  sort,
  lang,
}: PropsWithLang<SortedPostListProps>) {
  const compare = compareMarkdownDocument(field, sort, lang);

  return (
    <div className={styles['post-list']}>
      {items
        .toSorted((a, b) => compare(a.vMarkdownFileMeta, b.vMarkdownFileMeta))
        .map(({ vMarkdownFileMeta, postCard }) => (
          <Fragment key={vMarkdownFileMeta.id}>{postCard}</Fragment>
        ))}
    </div>
  );
}

function SortedPostListSearchParams({ items, lang }: PropsWithLang<PostListProps>) {
  const searchParams = useSearchParams();

  return (
    <SortedPostList
      items={items}
      field={normalizeField(searchParams.get('field'))}
      sort={normalizeSort(searchParams.get('sort'))}
      lang={lang}
    />
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function PostList({ items, lang }: PropsWithLang<PostListProps>) {
  return (
    <Suspense
      fallback={
        <SortedPostList
          items={items}
          field={DEFAULT_FIELD}
          sort={DEFAULT_SORT}
          lang={lang}
        />
      }
    >
      <SortedPostListSearchParams items={items} lang={lang} />
    </Suspense>
  );
}
