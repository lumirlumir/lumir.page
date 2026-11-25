/**
 * @fileoverview spinner.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';
import type { ComponentPropsWithRef } from 'react';
import styles from './spinner.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Spinner({ className, ...props }: ComponentPropsWithRef<'span'>) {
  return <span role="status" className={cn(styles.spinner, className)} {...props} />;
}
