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
      <img src={avatarUrl} width={96} height={96} alt={`${name}'s GitHub profile`} />
      <div className={styles['user-name']}>
        <Link href={`/${lang}`}>{name}</Link>
      </div>
      <div className={styles['user-bio']}>{bio}</div>
    </div>
  );
}
