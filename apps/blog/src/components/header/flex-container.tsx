/**
 * @fileoverview flex-container.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './flex-container.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function FlexContainer({ children }: PropsWithChildren) {
  return <div className={styles['flex-container']}>{children}</div>;
}
