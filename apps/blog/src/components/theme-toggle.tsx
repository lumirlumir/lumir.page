/**
 * @fileoverview theme-toggle.
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

import { cn } from '@lumir/utils';
import { useThemeContext, type Theme } from '@/components/theme-context';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import styles from './theme-toggle.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    ariaLabel: {
      dark: '다크 모드',
      light: '라이트 모드',
    },
  },
  en: {
    ariaLabel: {
      dark: 'Dark mode',
      light: 'Light mode',
    },
  },
} as const satisfies LangRecord<Record<'ariaLabel', Record<Theme, string>>>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders a localized button that toggles between the light and dark themes.
 */
export function ThemeToggle({ lang }: PropsWithLang) {
  const [theme, toggleTheme] = useThemeContext();

  return (
    <div className={styles['theme-toggle']}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dictionary[lang].ariaLabel[theme]}
        aria-pressed={theme === 'dark'}
      >
        <span className={styles.orb} aria-hidden="true" />
        <span className={styles.shadow} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray1)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray2)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray3)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray4)} aria-hidden="true" />
      </button>
    </div>
  );
}
