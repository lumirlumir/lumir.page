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
import { cn } from '@lumir/utils';
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
    <div>
      <button
        type="button"
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        onClick={toggleIsOpen}
        aria-expanded={isOpen}
        aria-label={sortMenuMeta.name[lang]}
      >
        <span className={styles.icons}>{sortMenuMeta.icons}</span>
        <span className={styles['name-en']}>{sortMenuMeta.name.en}</span>
        <span className={styles['name-ko']}>{sortMenuMeta.name.ko}</span>
        <span className={styles.sort}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {isOpen ? <ul className={styles.list}>{children}</ul> : null}
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
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        onClick={onClick}
        aria-label={`${frontmatterMeta[field].name[lang]} / ${sortMeta[sort].name[lang]}`}
      >
        <span className={styles.icons}>{frontmatterMeta[field].icons}</span>
        <span
          className={styles['name-en']}
        >{`${frontmatterMeta[field].name.en} / ${sortMeta[sort].name.en}`}</span>
        <span
          className={styles['name-ko']}
        >{`${frontmatterMeta[field].name.ko} / ${sortMeta[sort].name.ko}`}</span>
        <span className={styles.sort}>{sortMeta[sort].icons}</span>
      </button>
    </li>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders the bilingual sort menu with localized accessible labels.
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
