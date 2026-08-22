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

import { useShortcut } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';
import { useThemeContext } from '@/contexts/theme';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import { themeDefault, type Theme } from '@/data/theme';
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
} as const satisfies LangRecord<{ ariaLabel: Record<Theme, string> }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders a localized button that toggles between the light and dark themes.
 */
export function ThemeToggle({ lang }: PropsWithLang) {
  const [theme, toggleTheme] = useThemeContext();

  useShortcut('t', toggleTheme);

  return (
    <div className={styles['theme-toggle']}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dictionary[lang].ariaLabel[theme]}
        aria-pressed={theme === themeDefault}
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
