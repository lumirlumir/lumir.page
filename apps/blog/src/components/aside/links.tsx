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
import { author } from '@/data/author';
import { type PropsWithLang } from '@/data/lang';
import styles from './links.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function Links({ lang }: PropsWithLang) {
  return (
    <ul className={styles.links}>
      <li>
        <Link className="custom-hover-effect" href={`/${lang}`}>
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
