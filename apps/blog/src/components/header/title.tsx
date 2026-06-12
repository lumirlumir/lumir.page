/**
 * @fileoverview title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Image from 'next/image';
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
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          alt={`${name}'s GitHub profile image`}
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
