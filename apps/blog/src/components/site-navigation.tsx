/**
 * @fileoverview Primary editorial navigation.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './site-navigation.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    ariaLabel: '주요 탐색',
    links: {
      home: '처음으로',
      posts: '긴 글',
      snippet: '짧은 글',
      contribution: '오픈소스 기여',
      project: '프로젝트',
      community: '커뮤니티',
      about: '소개',
    },
  },
  en: {
    ariaLabel: 'Primary navigation',
    links: {
      home: 'HOME',
      posts: 'POSTS',
      snippet: 'SNIPPET',
      contribution: 'CONTRIBUTION',
      project: 'PROJECT',
      community: 'COMMUNITY',
      about: 'ABOUT',
    },
  },
} as const satisfies LangRecord<{
  ariaLabel: string;
  links: Record<(typeof links)[number]['key'], string>;
}>;

const links = [
  { key: 'home', pathname: '' },
  { key: 'posts', pathname: '' },
  { key: 'snippet', pathname: '' },
  { key: 'contribution', pathname: '' },
  { key: 'project', pathname: '' },
  { key: 'community', pathname: '' },
  { key: 'about', pathname: '' },
] as const;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function SiteNavigation({ lang }: PropsWithLang) {
  return (
    <nav className={styles['site-navigation']} aria-label={dictionary[lang].ariaLabel}>
      <ul>
        {links.map(({ key, pathname }) => (
          <li key={key}>
            <Link href={`/${lang}${pathname}`}>{dictionary[lang].links[key]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
