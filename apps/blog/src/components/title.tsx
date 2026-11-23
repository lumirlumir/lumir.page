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

export function Title({
  lang,
  size = 'medium',
}: PropsWithLang<{
  readonly size?: 'small' | 'medium' | 'large';
}>) {
  return (
    <div className={styles.title} data-size={size}>
      <Link
        href={`/${lang}${navMeta.home.pathname}`}
        aria-label={navMeta.home.name[lang]}
      >
        <strong>{author.lumirlumir.name}</strong>
        <span>{author.lumirlumir.bio}</span>
      </Link>
    </div>
  );
}
