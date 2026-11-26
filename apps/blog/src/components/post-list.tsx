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
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useSearchParams } from 'next/navigation';
import { Fragment, Suspense, type ReactNode } from 'react';
import {
  sortableFrontmatterKeyDefault,
  sortableFrontmatterKeys,
  type SortableFrontmatterKey,
} from '@/data/frontmatter';
import type { PropsWithLang } from '@/data/lang';
import { sortKeyDefault, sortKeys, type SortKey } from '@/data/sort';
import type { VMarkdownFileMeta } from '@/data/v-markdown';
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
  const fieldParam = searchParams.get('field');
  const sortParam = searchParams.get('sort');
  const selectedField =
    sortableFrontmatterKeys.find(key => key === fieldParam) ??
    sortableFrontmatterKeyDefault;
  const selectedSort = sortKeys.find(key => key === sortParam) ?? sortKeyDefault;

  return (
    <SortedPostList items={items} field={selectedField} sort={selectedSort} lang={lang} />
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function PostList({ items, lang }: PropsWithLang<PostListProps>) {
  return (
    <Suspense
      fallback={
        <SortedPostList
          items={items}
          field={sortableFrontmatterKeyDefault}
          sort={sortKeyDefault}
          lang={lang}
        />
      }
    >
      <SortedPostListSearchParams items={items} lang={lang} />
    </Suspense>
  );
}
