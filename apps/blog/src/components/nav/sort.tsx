/**
 * @fileoverview sort.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

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
      <div
        className={cn(styles['sort-item'], 'custom-hover-effect')}
        onClick={toggleIsOpen}
      >
        <div className={cn(styles['react-icons'], 'custom-flex-center')}>
          <GrSort />
        </div>
        <div className={styles['name-en']}>Sort</div>
        <div className={styles['name-ko']}>정렬</div>
        <div className={cn(styles.order, 'custom-flex-center')}>
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      {isOpen ? <ul className={styles.list}>{children}</ul> : null}
    </div>
  );
}

function SortItem({ sort, order }: { sort: SortableFrontmatterKey; order: SortKey }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onClick() {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', sort);
    params.set('order', order);

    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }

  return (
    <li className={cn(styles['sort-item'], 'custom-hover-effect')} onClick={onClick}>
      <div className={cn(styles['react-icons'], 'custom-flex-center')}>
        {frontmatterMeta[sort].reactIcons}
      </div>
      <div
        className={styles['name-en']}
      >{`${frontmatterMeta[sort].name.en} / ${sortMeta[order].name.en}`}</div>
      <div
        className={styles['name-ko']}
      >{`${frontmatterMeta[sort].name.ko} / ${sortMeta[order].name.ko}`}</div>
      <div className={cn(styles.order, 'custom-flex-center')}>
        {sortMeta[order].reactIcons}
      </div>
    </li>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Sort() {
  return (
    <SortContainer>
      <SortItem sort="title" order="desc" />
      <SortItem sort="title" order="asc" />
      <SortItem sort="created" order="desc" />
      <SortItem sort="created" order="asc" />
      <SortItem sort="updated" order="desc" />
      <SortItem sort="updated" order="asc" />
    </SortContainer>
  );
}
// TODO: add `title` prop for a11y
