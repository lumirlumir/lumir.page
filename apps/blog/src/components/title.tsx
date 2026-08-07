/**
 * @fileoverview Editorial wordmark.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { author } from '@/data/author';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './title.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    label: (name: string) => `${name} 홈`,
  },
  en: {
    label: (name: string) => `${name} home`,
  },
} as const satisfies LangRecord<{ label: (name: string) => string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Title({ lang }: PropsWithLang) {
  return (
    <div className={styles.title}>
      <Link href={`/${lang}`} aria-label={dictionary[lang].label(author.lumirlumir.name)}>
        <span className={styles.wordmark}>{author.lumirlumir.name}</span>
        <span className={styles.subtitle}>DEV JOURNAL</span>
      </Link>
    </div>
  );
}
