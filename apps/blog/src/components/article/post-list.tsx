/**
 * @fileoverview post-list.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useSearchParams } from 'next/navigation';
import { Fragment, type ReactNode } from 'react';
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
  items: readonly {
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

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function normalizeSort(sort: string | null): SortableFrontmatterKey {
  return sort === 'title' || sort === 'created' || sort === 'updated' ? sort : 'updated';
}

function normalizeOrder(order: string | null): SortKey {
  return order === 'asc' || order === 'desc' ? order : 'desc';
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function PostList({ items }: PostListProps) {
  const searchParams = useSearchParams();

  const normalizedSort = normalizeSort(searchParams.get('sort')); // TODO: Rename `sort` and `order`.
  const normalizedOrder = normalizeOrder(searchParams.get('order'));

  const compare = compareMarkdownDocument(normalizedSort, normalizedOrder);

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
