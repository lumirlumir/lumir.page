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
import { FaAngleDown, FaAngleUp, GrSort } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import { frontmatterMeta, type SortableFrontmatterKey } from '@/data/frontmatter';
import { sortMeta, type SortKey } from '@/data/sort';
import styles from './sort.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function SortContainer({ children }: PropsWithChildren) {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <div>
      <button
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        type="button"
        aria-expanded={isOpen}
        onClick={toggleIsOpen}
      >
        <div className={styles['react-icons']}>
          <GrSort />
        </div>
        <div className={styles['name-en']}>Sort</div>
        <div className={styles['name-ko']}>정렬</div>
        <div className={styles.sort}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      </button>
      {isOpen ? <ul className={styles.list}>{children}</ul> : null}
    </div>
  );
}

function SortItem({ field, sort }: { field: SortableFrontmatterKey; sort: SortKey }) {
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
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        type="button"
        onClick={onClick}
      >
        <div className={styles['react-icons']}>{frontmatterMeta[field].reactIcons}</div>
        <div
          className={styles['name-en']}
        >{`${frontmatterMeta[field].name.en} / ${sortMeta[sort].name.en}`}</div>
        <div
          className={styles['name-ko']}
        >{`${frontmatterMeta[field].name.ko} / ${sortMeta[sort].name.ko}`}</div>
        <div className={styles.sort}>{sortMeta[sort].reactIcons}</div>
      </button>
    </li>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Sort() {
  return (
    <SortContainer>
      <SortItem field="title" sort="desc" />
      <SortItem field="title" sort="asc" />
      <SortItem field="created" sort="desc" />
      <SortItem field="created" sort="asc" />
      <SortItem field="updated" sort="desc" />
      <SortItem field="updated" sort="asc" />
    </SortContainer>
  );
}
