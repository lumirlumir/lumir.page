/**
 * @fileoverview links.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { useRef } from 'react';
import { useShortcut } from '@lumir/react-kit/hooks';
import { FaGithub, FaHouseChimney } from '@lumir/react-kit/svgs';
import { author } from '@/data/author';
import type { LangRecord, PropsWithLang } from '@/data/lang';
import { navMeta } from '@/data/nav';
import styles from './links.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    github: '깃허브',
  },
  en: {
    github: 'GitHub',
  },
} as const satisfies LangRecord<{ github: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Links({ lang }: PropsWithLang) {
  const homeRef = useRef<HTMLAnchorElement | null>(null);

  useShortcut('h', () => {
    homeRef.current?.click();
  });

  return (
    <ul className={styles.links}>
      <li>
        <Link
          ref={homeRef}
          className="custom-hover-effect"
          href={`/${lang}${navMeta.home.pathname}`}
        >
          <FaHouseChimney />
          <span>{navMeta.home.name[lang]}</span>
        </Link>
      </li>
      <li>
        <Link className="custom-hover-effect" href={author.lumirlumir.htmlUrl}>
          <FaGithub />
          <span>{dictionary[lang].github}</span>
        </Link>
      </li>
    </ul>
  );
}
