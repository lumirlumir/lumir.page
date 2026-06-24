/**
 * @fileoverview body.
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
import styles from './body.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Body({ children }: PropsWithChildren) {
  return <body className={cn(styles.body, 'custom-scrollbar-y-bold')}>{children}</body>;
}
