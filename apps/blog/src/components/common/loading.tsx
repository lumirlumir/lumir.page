/**
 * @fileoverview loading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';
import styles from './loading.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Loading({ content }: { content: string }) {
  return (
    <div className={cn(styles.loading, 'custom-flex-center')}>
      <div className="custom-flex-center">
        <div>
          <img
            src="/images/loading.gif"
            width={48}
            height={48}
            alt="GitHub GIF loading"
          />
        </div>
        <div className={styles.content}>{content} 불러오는 중...</div>
      </div>
    </div>
  );
}
