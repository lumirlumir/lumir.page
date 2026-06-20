/**
 * @fileoverview lang-toggle.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@lumir/utils';
import styles from './lang-toggle.module.css';

// --------------------------------------------------------------------------------
// Constant
// --------------------------------------------------------------------------------

const langSegmentPattern = /^\/(?<lang>ko|en)(?=\/|$)/;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function LangToggle() {
  const pathname = usePathname();
  const currentLang =
    langSegmentPattern.exec(pathname)?.groups?.lang === 'en' ? 'en' : 'ko';
  const nextLang = currentLang === 'ko' ? 'en' : 'ko';
  const nextPathname = pathname.replace(langSegmentPattern, `/${nextLang}`);
  const href = nextPathname === pathname ? `/${nextLang}` : nextPathname;

  return (
    <div className={cn(styles['lang-toggle'], 'custom-flex-center')}>
      <Link
        href={href as Route}
        className={cn(styles.link, 'custom-flex-center', 'custom-hover-effect')}
        aria-label={`Switch language to ${nextLang}`}
      >
        {nextLang}
      </Link>
    </div>
  );
}
