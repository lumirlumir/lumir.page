/**
 * @fileoverview Aside toggle.
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

import { useToggle } from '@lumir/react-kit/hooks';
import { HiOutlineMenuAlt2 } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './aside-toggle.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    close: '사이드바 닫기',
    open: '사이드바 열기',
  },
  en: {
    close: 'Close sidebar',
    open: 'Open sidebar',
  },
} as const satisfies LangRecord<{ close: string; open: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function AsideToggle({ className, lang }: PropsWithLang<{ className: string }>) {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <button
      className={cn(styles.button, visible && styles.visible, className)}
      type="button"
      aria-expanded={visible}
      aria-label={visible ? dictionary[lang].close : dictionary[lang].open}
      onClick={toggleVisible}
    >
      <HiOutlineMenuAlt2 aria-hidden="true" />
    </button>
  );
}
