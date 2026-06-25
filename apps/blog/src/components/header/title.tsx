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
import { cn } from '@lumir/utils';
import { type PropsWithLang } from '@/data/lang';
import { getGithubUsers } from '@/utils/fetch';
import styles from './title.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Title({ lang }: PropsWithLang) {
  const { avatar_url: avatarUrl, bio, name } = await getGithubUsers();

  return (
    <div className={cn(styles.title, 'custom-flex-center')}>
      <Link href={`/${lang}`}>
        <img
          src={(() => {
            // To avoid downloading a much larger image than needed,
            // we can add a query parameter to the avatar URL to request a smaller size.
            const url = new URL(avatarUrl);
            url.searchParams.set('s', '40');
            return url.toString();
          })()}
          width={40}
          height={40}
          alt={`${name}'s GitHub profile`}
        />
      </Link>

      <div>
        <div className={styles['user-name']}>
          <Link href={`/${lang}`}>{name}</Link>
        </div>
        <div className={styles['user-bio']}>{bio}</div>
      </div>
    </div>
  );
}
