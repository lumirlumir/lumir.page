/**
 * @fileoverview profile.
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
import styles from './profile.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Profile({ lang }: PropsWithLang) {
  return (
    <div className={styles.profile}>
      <img
        src={(() => {
          // To avoid downloading a much larger image than needed,
          // we can add a query parameter to the avatar URL to request a smaller size.
          const url = new URL(author.lumirlumir.avatarUrl);
          url.searchParams.set('s', '96');
          return url.toString();
        })()}
        width={96}
        height={96}
        alt={`${author.lumirlumir.name}'s GitHub profile`}
      />
      <div className={styles['user-name']}>
        <Link href={`/${lang}`}>{author.lumirlumir.name}</Link>
      </div>
      <div className={styles['user-bio']}>{author.lumirlumir.bio}</div>
    </div>
  );
}
