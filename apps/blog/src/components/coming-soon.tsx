/**
 * @fileoverview Shared placeholder for pages awaiting content.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { LangKey, LangRecord } from '@/data/lang';
import styles from './loading.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    message: '아직 이 페이지는 준비 중입니다.',
  },
  en: {
    message: 'This page is coming soon.',
  },
} as const satisfies LangRecord<{ message: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function ComingSoon({ params }: PageProps<'/[lang]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return (
    <div className={styles.loading} role="status">
      <div>
        <div>
          <img src="/images/loading.gif" width={48} height={48} alt="" />
        </div>
        <div>{dictionary[lang].message}</div>
      </div>
    </div>
  );
}
