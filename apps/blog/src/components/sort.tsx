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

import { usePathname, useSearchParams } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useToggle } from '@lumir/react-kit/hooks';
import { FaAngleDown, FaAngleUp } from '@lumir/react-kit/svgs';
import { frontmatterMeta, type SortableFrontmatterKey } from '@/data/frontmatter';
import type { PropsWithLang } from '@/data/lang';
import { sortMenuMeta, sortMeta, type SortKey } from '@/data/sort';
import styles from './sort.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function SortContainer({ children, lang }: PropsWithLang<PropsWithChildren>) {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <div className={styles.sort}>
      <button type="button" onClick={toggleIsOpen} aria-expanded={isOpen}>
        <span aria-hidden="true">{sortMenuMeta.icons}</span>
        <span>{sortMenuMeta.name[lang].toUpperCase()}</span>
        {isOpen ? <FaAngleUp aria-hidden="true" /> : <FaAngleDown aria-hidden="true" />}
      </button>
      {isOpen ? <ul>{children}</ul> : null}
    </div>
  );
}

function SortItem({
  field,
  sort,
  lang,
}: PropsWithLang<{ field: SortableFrontmatterKey; sort: SortKey }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fieldParam = searchParams.get('field');
  const selectedField =
    fieldParam === 'title' || fieldParam === 'created' ? fieldParam : 'updated';
  const selectedSort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc';

  function onClick() {
    const params = new URLSearchParams(searchParams.toString());

    params.set('field', field);
    params.set('sort', sort);

    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }

  return (
    <li>
      <button
        type="button"
        aria-pressed={field === selectedField && sort === selectedSort}
        onClick={onClick}
      >
        <span aria-hidden="true">{frontmatterMeta[field].icons}</span>
        <span>
          {`${frontmatterMeta[field].name[lang]} / ${sortMeta[sort].name[lang]}`.toUpperCase()}
        </span>
        <span aria-hidden="true">{sortMeta[sort].icons}</span>
      </button>
    </li>
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
    <SortContainer lang={lang}>
      <SortItem field="title" sort="desc" lang={lang} />
      <SortItem field="title" sort="asc" lang={lang} />
      <SortItem field="created" sort="desc" lang={lang} />
      <SortItem field="created" sort="asc" lang={lang} />
      <SortItem field="updated" sort="desc" lang={lang} />
      <SortItem field="updated" sort="asc" lang={lang} />
    </SortContainer>
  );
}
