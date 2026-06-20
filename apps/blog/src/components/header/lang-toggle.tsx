/**
 * @fileoverview lang-toggle.
 */

// TODO: handle search params and hash params when switching language.

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { cn } from '@lumir/utils';
import { langDefault, langKeys, type LangRecord, type PropsWithLang } from '@/data/lang';
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

export default function LangToggle({ lang }: PropsWithLang) {
  const layoutSegments = useSelectedLayoutSegments();
  const nextLang = langKeys.find(langkey => langkey !== lang) ?? langDefault;
  const href = `/${[nextLang, ...layoutSegments].join('/')}` as const;

  return (
    <div className={cn(styles['lang-toggle'], 'custom-flex-center')}>
      <Link
        className={cn('custom-flex-center', 'custom-hover-effect')}
        href={href}
        aria-label={ariaLabelByLang[lang]}
      >
        {nextLang}
      </Link>
    </div>
  );
}
