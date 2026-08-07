/**
 * @fileoverview lang-toggle.
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

import { useSelectedLayoutSegments } from 'next/navigation';
import { langDefault, langKeys, type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './lang-toggle.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    ariaLabel: '언어를 영어로 전환',
  },
  en: {
    ariaLabel: 'Switch language to Korean',
  },
} as const satisfies LangRecord<{ ariaLabel: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function LangToggle({ lang }: PropsWithLang) {
  const layoutSegments = useSelectedLayoutSegments();
  const nextLang = langKeys.find(langkey => langkey !== lang) ?? langDefault;
  const href = `/${[nextLang, ...layoutSegments].join('/')}` as const;

  return (
    <div className={styles['lang-toggle']}>
      {/*
       * Use a native anchor intentionally so switching languages performs a full-page navigation.
       * Each localized route owns document-level state such as `<html lang>`, and a fresh document
       * also reruns `ThemeScript` before hydration to restore the persisted `data-theme` safely.
       */}
      <a
        className="custom-hover-effect"
        href={href}
        onClick={e => {
          // Preserve search params and hash params when switching language.
          const url = new URL(window.location.href);
          url.pathname = url.pathname.replace(`/${lang}`, `/${nextLang}`);
          e.currentTarget.href = url.href;
        }}
        aria-label={dictionary[lang].ariaLabel}
      >
        {nextLang}
      </a>
    </div>
  );
}
