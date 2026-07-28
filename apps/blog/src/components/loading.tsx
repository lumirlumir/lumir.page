/**
 * @fileoverview loading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import styles from './loading.module.css';
import { type PropsWithLang, type LangRecord } from '@/data/lang';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    content: (content: string) => `${content} 불러오는 중` as const,
  },
  en: {
    content: (content: string) => `Loading ${content}` as const,
  },
} as const satisfies LangRecord<{ content: (content: string) => string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders a localized loading indicator for the provided content.
 */
export function Loading({ content, lang }: PropsWithLang<{ content: string }>) {
  return (
    <div className={styles.loading} role="status">
      <div>
        <div>
          <img src="/images/loading.gif" width={48} height={48} alt="" />
        </div>
        <div>{dictionary[lang].content(content)}...</div>
      </div>
    </div>
  );
}
