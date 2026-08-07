/**
 * @fileoverview theme-context.
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

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type PropsWithChildren,
} from 'react';
import { themeDefault, themeKey, themeKeys, type Theme } from '@/data/theme';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Defines the shape of the context value provided by the `ThemeContext`,
 * including the current theme and a function to toggle between themes.
 */
export type ThemeContextValue = readonly [theme: Theme, toggleTheme: () => void];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getThemeSnapshot(): Theme {
  return (document.documentElement.getAttribute(themeKey) ?? themeDefault) as Theme;
}

function getServerThemeSnapshot(): typeof themeDefault {
  return themeDefault;
}

function subscribeThemeStore(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [themeKey],
  });

  return () => {
    observer.disconnect();
  };
}

function toggleTheme() {
  const nextTheme = getThemeSnapshot() === themeKeys[0] ? themeKeys[1] : themeKeys[0];

  // 1. Update the `data-theme` attribute on the root document element to apply the theme globally.
  document.documentElement.setAttribute(themeKey, nextTheme);

  // 2. Persist the current theme in `localStorage` to remember the user's preference across sessions.
  // `localStorage` is scoped per origin, so this key will not conflict across different domains,
  // protocols, or ports. It can only collide with other apps running on the same origin.
  localStorage.setItem(themeKey, nextTheme);
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Returns the current theme context value.
 *
 * @returns A tuple containing the current theme and a function that toggles it.
 * @throws {Error} Throws when called outside of `ThemeProvider`.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const [theme, toggleTheme] = useThemeContext();
 *
 *   return (
 *     <button type="button" onClick={toggleTheme}>
 *       Switch to {theme === 'dark' ? 'light' : 'dark'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('`useThemeContext` must be used within a `ThemeProvider`.');
  }

  return context;
}

/**
 * Provides theme state and a toggle handler to all descendant components.
 *
 * The initial theme is resolved from the `data-theme` attribute on the root
 * document element, then kept in sync with both the document and `localStorage`.
 *
 * @param props The component props.
 * @param props.children The child elements that should receive theme context.
 * @returns A context provider wrapping the given children.
 *
 * @example
 * ```tsx
 * export default function RootLayout({ children }: PropsWithChildren) {
 *   return (
 *     <html lang="ko" data-theme="dark" suppressHydrationWarning>
 *       <body>
 *         <ThemeProvider>
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useSyncExternalStore<Theme>(
    subscribeThemeStore,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  // eslint-disable-next-line react/jsx-no-constructed-context-values -- React Compiler automatically optimizes context values.
  return <ThemeContext value={[theme, toggleTheme]}>{children}</ThemeContext>;
}
