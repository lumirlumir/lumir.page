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
import type { PropsWithLang } from '@/data/lang';
import styles from './links.module.css';

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
        <Link ref={homeRef} className="custom-hover-effect" href={`/${lang}`}>
          <FaHouseChimney />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link className="custom-hover-effect" href={author.lumirlumir.htmlUrl}>
          <FaGithub />
          <span>GitHub</span>
        </Link>
      </li>
    </ul>
  );
}
