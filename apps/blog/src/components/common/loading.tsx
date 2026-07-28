/**
 * @fileoverview loading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import styles from './loading.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Loading({ content }: { content: string }) {
  return (
    <div className={styles.loading}>
      <div className="flex-center">
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
