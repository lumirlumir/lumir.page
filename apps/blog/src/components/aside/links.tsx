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
import { author } from '@/data/author';
import { type PropsWithLang } from '@/data/lang';
import styles from './links.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Links({ lang }: PropsWithLang) {
  return (
    <ul className={styles.links}>
      <li>
        <Link className={cn('flex-center', 'custom-hover-effect')} href={`/${lang}`}>
          <FaHouseChimney />
          <span className="flex-center">Home</span>
        </Link>
      </li>
      <li>
        <Link
          className={cn('flex-center', 'custom-hover-effect')}
          href={author.lumirlumir.htmlUrl}
        >
          <FaGithub />
          <span className="flex-center">GitHub</span>
        </Link>
      </li>
    </ul>
  );
}
