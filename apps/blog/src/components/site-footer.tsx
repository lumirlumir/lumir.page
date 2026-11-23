/**
 * @fileoverview Shared editorial footer.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { Title } from '@/components/title';
import { author } from '@/data/author';
import type { LangRecord, PropsWithLang } from '@/data/lang';
import styles from './site-footer.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    description: '코드와 시스템, 그리고 그 사이의 사람을 오래 읽히는 글로 기록합니다.',
    backToTop: '맨 위로',
  },
  en: {
    description: 'Notes on code, systems, and the people working between them.',
    backToTop: 'Back to top',
  },
} as const satisfies LangRecord<{
  description: string;
  backToTop: string;
}>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function SiteFooter({ lang }: PropsWithLang) {
  const copy = dictionary[lang];

  return (
    <footer className={styles.footer} id="about">
      <Title lang={lang} size="large" />
      <p>{copy.description}</p>
      <nav aria-label="Footer">
        <Link href={`/${lang}`}>JOURNAL</Link>
        <Link href={author.lumirlumir.htmlUrl}>GITHUB</Link>
        <a href="mailto:contact@lumir.dev">CONTACT</a>
      </nav>
      <div className={styles.folio}>
        <span>© 2026 LUMIR DEV JOURNAL</span>
        <span>SEOUL · KR</span>
        <a href={`/${lang}#top`}>
          {copy.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
