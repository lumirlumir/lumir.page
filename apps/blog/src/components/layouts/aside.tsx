/**
 * @fileoverview aside.
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

import { type PropsWithChildren } from 'react';
import { useToggle } from '@lumir/react-kit/hooks';
import { HiOutlineMenuAlt2 } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import styles from './aside.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Aside({ children }: PropsWithChildren) {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <aside
        className={cn(
          styles.aside,
          visible && styles.visible,
          'custom-scrollbar-y-regular',
        )}
      >
        {children}
      </aside>
      <div
        className={cn(styles.div, visible && styles.visible, 'custom-flex-center')}
        onClick={toggleVisible}
      >
        <HiOutlineMenuAlt2 />
      </div>
    </>
  );
}
