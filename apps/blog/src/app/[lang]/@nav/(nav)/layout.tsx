/**
 * @fileoverview Layout for routes with navigation.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import styles from './layout.module.css';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Layout({ children }: PropsWithChildren) {
  return <nav className={cn(styles.nav, 'custom-scrollbar-y-regular')}>{children}</nav>;
}
