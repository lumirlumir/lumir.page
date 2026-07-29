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
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './title.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    alt: (name: string) => `${name}의 GitHub 프로필`,
  },
  en: {
    alt: (name: string) => `${name}'s GitHub profile`,
  },
} as const satisfies LangRecord<{ alt: (name: string) => string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Title({ lang }: PropsWithLang) {
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
          alt={dictionary[lang].alt(author.lumirlumir.name)}
        />
      </Link>

      <div>
        <div>
          <Link href={`/${lang}`}>{author.lumirlumir.name}</Link>
        </div>
        <div>{author.lumirlumir.bio}</div>
      </div>
    </div>
  );
}
