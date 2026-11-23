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
import type { LangRecord, PropsWithLang } from '@/data/lang';
import { navKeys, navMeta } from '@/data/nav';
import styles from './site-navigation.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    ariaLabel: '주요 탐색',
  },
  en: {
    ariaLabel: 'primary navigation',
  },
} as const satisfies LangRecord<{ ariaLabel: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function SiteNavigation({ lang }: PropsWithLang) {
  return (
    <nav
      className={styles['site-navigation']}
      aria-label={dictionary[lang].ariaLabel.toUpperCase()}
    >
      <ul>
        {navKeys.map(key => {
          const { name, pathname } = navMeta[key];

          return (
            <li key={key}>
              <Link href={{ pathname: `/${lang}${pathname}` }}>
                {name[lang].toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
