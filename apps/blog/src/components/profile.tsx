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

import { author } from '@/data/author';
import type { LangRecord, PropsWithLang } from '@/data/lang';
import styles from './profile.module.css';

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

export function Profile({ lang, size }: PropsWithLang<{ readonly size: number }>) {
  return (
    <a
      className={styles.profile}
      href={author.lumirlumir.htmlUrl}
      target="_blank"
      rel="noopener"
    >
      <img
        src={(() => {
          // To avoid downloading a much larger image than needed,
          // we can add a query parameter to the avatar URL to request a smaller size.
          const url = new URL(author.lumirlumir.avatarUrl);
          url.searchParams.set('s', String(size));
          return url.toString();
        })()}
        width={size}
        height={size}
        alt={dictionary[lang].alt(author.lumirlumir.name)}
      />
    </a>
  );
}
