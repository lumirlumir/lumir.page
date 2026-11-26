/**
 * @fileoverview sort.
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
import { Suspense } from 'react';
import {
  sortableFrontmatterKeyDefault,
  sortableFrontmatterKeys,
  frontmatterMeta,
  type SortableFrontmatterKey,
} from '@/data/frontmatter';
import type { LangRecord, PropsWithLang } from '@/data/lang';
import {
  sortKeyDefault,
  sortKeys,
  sortMenuMeta,
  sortMeta,
  type SortKey,
} from '@/data/sort';
import styles from './sort.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    sortBy: '정렬 기준',
    sortDirection: '정렬 방향',
  },
  en: {
    sortBy: 'Sort by',
    sortDirection: 'Sort direction',
  },
} as const satisfies LangRecord<{ sortBy: string; sortDirection: string }>;

function SortOptions({ lang }: PropsWithLang) {
  const searchParams = useSearchParams();
  const fieldParam = searchParams.get('field');
  const sortParam = searchParams.get('sort');
  const selectedField =
    sortableFrontmatterKeys.find(key => key === fieldParam) ??
    sortableFrontmatterKeyDefault;
  const selectedSort = sortKeys.find(key => key === sortParam) ?? sortKeyDefault;

  function updateSort(field: SortableFrontmatterKey, sort: SortKey) {
    const params = new URLSearchParams(searchParams);

    params.set('field', field);
    params.set('sort', sort);

    window.history.replaceState(null, '', `?${params}`);
  }

  return (
    <>
      <ul aria-label={dictionary[lang].sortBy}>
        {sortableFrontmatterKeys.map(field => (
          <li key={field}>
            <button
              type="button"
              aria-pressed={field === selectedField}
              onClick={() => updateSort(field, selectedSort)}
            >
              <span aria-hidden="true">{frontmatterMeta[field].icons}</span>
              {frontmatterMeta[field].name[lang].toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <ul aria-label={dictionary[lang].sortDirection}>
        {sortKeys.map(sort => (
          <li key={sort}>
            <button
              type="button"
              aria-pressed={sort === selectedSort}
              onClick={() => updateSort(selectedField, sort)}
            >
              <span aria-hidden="true">{sortMeta[sort].icons}</span>
              {sortMeta[sort].name[lang].toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders a localized sort menu for the post list.
 */
export function Sort({ lang }: PropsWithLang) {
  return (
    <div className={styles.sort}>
      <p>
        {sortMenuMeta.name[lang]}
        <span aria-hidden="true">{sortMenuMeta.icons}</span>
      </p>
      <Suspense fallback={null}>
        <SortOptions lang={lang} />
      </Suspense>
    </div>
  );
}
