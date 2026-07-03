/**
 * @fileoverview links.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaGithub, FaHouseChimney } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import { type PropsWithLang } from '@/data/lang';
import { getGithubUsers } from '@/utils/fetch';
import styles from './links.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Links({ lang }: PropsWithLang) {
  const { html_url: htmlUrl } = await getGithubUsers();

  return (
    <ul className={cn(styles.links, 'custom-flex-center')}>
      <li>
        <Link
          className={cn('custom-flex-center', 'custom-hover-effect')}
          href={`/${lang}`}
        >
          <FaHouseChimney />
          <span className="custom-flex-center">Home</span>
        </Link>
      </li>
      <li>
        <Link className={cn('custom-flex-center', 'custom-hover-effect')} href={htmlUrl}>
          <FaGithub />
          <span className="custom-flex-center">GitHub</span>
        </Link>
      </li>
    </ul>
  );
}
