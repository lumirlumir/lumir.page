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
import { useThemeContext } from '@/components/common/theme-context';
import styles from './theme-toggle.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function ThemeToggle() {
  const [theme, toggleTheme] = useThemeContext();

  return (
    <div className={cn(styles['theme-toggle'], 'custom-flex-center')}>
      <button
        type="button"
        className={styles.switch}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Dark mode' : 'Light mode'}
        aria-pressed={theme === 'dark'}
        suppressHydrationWarning // TODO: Remove it later.
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
