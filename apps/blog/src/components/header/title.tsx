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
import { type PropsWithLang } from '@/data/lang';
import styles from './title.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Title({ lang }: PropsWithLang) {
  return (
    <div className={styles.title}>
      <Link href={`/${lang}`}>
        <img
          src={(() => {
            // To avoid downloading a much larger image than needed,
            // we can add a query parameter to the avatar URL to request a smaller size.
            const url = new URL(author.lumirlumir.avatarUrl);
            url.searchParams.set('s', '40');
            return url.toString();
          })()}
          width={40}
          height={40}
          alt={`${author.lumirlumir.name}'s GitHub profile`}
        />
      </Link>

      <div>
        <div className={styles['user-name']}>
          <Link href={`/${lang}`}>{author.lumirlumir.name}</Link>
        </div>
        <div className={styles['user-bio']}>{author.lumirlumir.bio}</div>
      </div>
    </div>
  );
}
