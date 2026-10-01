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
import { type PropsWithChildren } from 'react';
import { useToggle } from '@lumir/react-kit/hooks';
import { FaAngleDown, FaAngleUp } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import { frontmatterMeta, type SortableFrontmatterKey } from '@/data/frontmatter';
import { type PropsWithLang } from '@/data/lang';
import { sortMenuMeta, sortMeta, type SortKey } from '@/data/sort';
import styles from './sort.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function SortContainer({ children, lang }: PropsWithLang<PropsWithChildren>) {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <div>
      <div
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        onClick={toggleIsOpen}
      >
        <div className={styles['react-icons']}>{sortMenuMeta.reactIcons}</div>
        <div className={styles.name}>{sortMenuMeta.name[lang].toUpperCase()}</div>
        <div className={styles.sort}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>
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
    <li className={cn(styles['sort-item'], 'custom-hover-effect')} onClick={onClick}>
      <div className={styles['react-icons']}>{frontmatterMeta[field].reactIcons}</div>
      <div className={styles.name}>
        {`${frontmatterMeta[field].name[lang]} / ${sortMeta[sort].name[lang]}`.toUpperCase()}
      </div>
      <div className={styles.sort}>{sortMeta[sort].reactIcons}</div>
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
// TODO: add `title` prop for a11y
