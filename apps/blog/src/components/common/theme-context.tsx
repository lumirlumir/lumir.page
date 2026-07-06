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

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the available application theme modes.
 * @default 'dark'
 */
export type Theme = 'dark' | 'light';

/**
 * Defines the shape of the context value provided by the `ThemeContext`,
 * including the current theme and a function to toggle between themes.
 */
export type ThemeContextValue = readonly [theme: Theme, toggleTheme: () => void];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const themeKey = 'data-theme';
const defaultTheme = 'dark' satisfies Theme;
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute(themeKey) === 'light'
    ? 'light'
    : defaultTheme;
}

function getServerThemeSnapshot(): typeof defaultTheme {
  return defaultTheme;
}

function subscribeThemeStore(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);

  observer.observe(document.documentElement, {
    attributeFilter: [themeKey],
    attributes: true,
  });

  return () => {
    observer.disconnect();
  };
}

function toggleTheme() {
  const currentTheme = getThemeSnapshot() === 'dark' ? 'light' : 'dark';

  // 1. Update the `data-theme` attribute on the root document element to apply the theme globally.
  document.documentElement.setAttribute(themeKey, currentTheme);

  // 2. Persist the current theme in `localStorage` to remember the user's preference across sessions.
  // `localStorage` is scoped per origin, so this key will not conflict across different domains,
  // protocols, or ports. It can only collide with other apps running on the same origin.
  localStorage.setItem(themeKey, currentTheme);
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
