/**
 * @fileoverview nav.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import styles from './nav.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Nav({ children }: PropsWithChildren) {
  return <nav className={cn(styles.nav, 'custom-scrollbar-y-regular')}>{children}</nav>;
}
