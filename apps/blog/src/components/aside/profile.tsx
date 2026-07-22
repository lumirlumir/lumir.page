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
import { cn } from '@lumir/utils';
import { type PropsWithLang } from '@/data/lang';
import { getGithubUsers } from '@/utils/fetch';
import styles from './profile.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Profile({ lang }: PropsWithLang) {
  const { avatar_url: avatarUrl, bio, name } = await getGithubUsers();

  return (
    <div className={cn(styles.profile, 'custom-flex-center')}>
      <img
        src={(() => {
          // To avoid downloading a much larger image than needed,
          // we can add a query parameter to the avatar URL to request a smaller size.
          const url = new URL(avatarUrl);
          url.searchParams.set('s', '96');
          return url.toString();
        })()}
        width={96}
        height={96}
        alt={`${name}'s GitHub profile`}
      />
      <div className={styles['user-name']}>
        <Link href={`/${lang}`}>{name}</Link>
      </div>
      <div className={styles['user-bio']}>{bio}</div>
    </div>
  );
}
