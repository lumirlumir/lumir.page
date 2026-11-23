/**
 * @fileoverview title.
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
import type { PropsWithLang } from '@/data/lang';
import { navMeta } from '@/data/nav';
import styles from './title.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Title({ lang }: PropsWithLang) {
  return (
    <div className={styles.title}>
      <Link
        href={`/${lang}${navMeta.home.pathname}`}
        aria-label={navMeta.home.name[lang]}
      >
        <span className={styles.wordmark}>{author.lumirlumir.name}</span>
        <span className={styles.subtitle}>{author.lumirlumir.bio}</span>
      </Link>
    </div>
  );
}
