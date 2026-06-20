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

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@lumir/utils';
import { langDefault, langKeys, type LangKey, type LangRecord } from '@/data/lang';
import styles from './lang-toggle.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ariaLabelByLang = {
  ko: '언어를 영어로 전환',
  en: 'Switch language to Korean',
} as const satisfies LangRecord<string>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function LangToggle() {
  const pathname = usePathname().toString();
  const searchParams = useSearchParams().toString();
  const segments = pathname.split('/').filter(Boolean);
  const hasLangSegment = langKeys.some(lang => lang === segments[0]);
  const currentLang = hasLangSegment ? (segments[0] as LangKey) : langDefault;
  const nextLang = langKeys.find(lang => lang !== currentLang) ?? langDefault;
  const nextSegments = hasLangSegment ? segments.slice(1) : segments;
  const href =
    `/${[nextLang, ...nextSegments].join('/')}${searchParams ? `?${searchParams}` : ''}` as const;

  return (
    <div className={cn(styles['lang-toggle'], 'custom-flex-center')}>
      <Link
        className={cn('custom-flex-center', 'custom-hover-effect')}
        href={href}
        aria-label={ariaLabelByLang[currentLang]}
      >
        {nextLang}
      </Link>
    </div>
  );
}
