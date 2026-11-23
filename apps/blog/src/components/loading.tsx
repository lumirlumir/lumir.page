/**
 * @fileoverview loading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { PropsWithChildren } from 'react';
import styles from './loading.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Displays the provided content below the loading image.
 */
export function Loading({ children }: PropsWithChildren) {
  return (
    <div className={styles.loading} role="status">
      <div>
        <div>
          <img src="/images/loading.gif" width={48} height={48} alt="" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
