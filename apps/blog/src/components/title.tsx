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
// Typedef
// --------------------------------------------------------------------------------

type TitleProps = PropsWithLang<{
  readonly size?: 'small' | 'medium' | 'large';
  readonly subtitle?: string;
}>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Title({
  lang,
  size = 'medium',
  subtitle = author.lumirlumir.bio,
}: TitleProps) {
  return (
    <div className={styles.title} data-size={size}>
      <Link
        href={`/${lang}${navMeta.home.pathname}`}
        aria-label={navMeta.home.name[lang]}
      >
        <span className={styles.wordmark}>{author.lumirlumir.name}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </Link>
    </div>
  );
}
