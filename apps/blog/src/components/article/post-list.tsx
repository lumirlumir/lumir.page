/**
 * @fileoverview post-list.
 *
 * NOTE: We use `Suspense` instead of `useEffect` to avoid a visual jump.
 * With `useEffect`, the default post list is painted first,
 * and the search-param-based order is applied afterward when the effect runs.
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
   * The order in which the posts should be sorted.
   */
  readonly order: SortKey;

  /**
   * The key by which the posts should be sorted.
   */
  readonly sort: SortableFrontmatterKey;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const DEFAULT_SORT = 'updated';
const DEFAULT_ORDER = 'desc';

function normalizeSort(sort: string | null): SortableFrontmatterKey {
  return sort === 'title' || sort === 'created' || sort === 'updated'
    ? sort
    : DEFAULT_SORT;
}

function normalizeOrder(order: string | null): SortKey {
  return order === 'asc' || order === 'desc' ? order : DEFAULT_ORDER;
}

function SortedPostList({ items, sort, order }: SortedPostListProps) {
  const compare = compareMarkdownDocument(sort, order);

  return (
    <div className={styles['post-list']}>
      {items
        .toSorted((a, b) => compare(a.vMarkdownFileMeta, b.vMarkdownFileMeta))
        .map(({ vMarkdownFileMeta, postCard }) => (
          <Fragment key={vMarkdownFileMeta.slug}>{postCard}</Fragment>
        ))}
    </div>
  );
}

function SortedPostListSearchParams({ items }: PostListProps) {
  const searchParams = useSearchParams();

  return (
    <SortedPostList
      items={items}
      order={normalizeOrder(searchParams.get('order'))} // TODO: Rename `sort` and `order`.
      sort={normalizeSort(searchParams.get('sort'))}
    />
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function PostList({ items }: PostListProps) {
  return (
    <Suspense
      fallback={
        <SortedPostList items={items} order={DEFAULT_ORDER} sort={DEFAULT_SORT} />
      }
    >
      <SortedPostListSearchParams items={items} />
    </Suspense>
  );
}
