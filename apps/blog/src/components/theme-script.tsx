/**
 * @fileoverview theme-script.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { themeKey, themeKeys } from '@/data/theme';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Applies the persisted or system-preferred theme before the rest of the UI hydrates.
 *
 * This inline script reads the saved `data-theme` value from `localStorage`.
 * If no saved value exists, it falls back to the user's `prefers-color-scheme`
 * setting and writes the resolved theme to the root `<html>` element.
 *
 * @returns An inline `<script>` element that sets the initial document theme.
 *
 * @example
 * ```tsx
 * export default function RootLayout({ children }: PropsWithChildren) {
 *   return (
 *     <html>
 *       <body>
 *         <ThemeScript />
 *         <MyComponents />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ThemeScript() {
  return (
    <script>
      {`const savedTheme = localStorage.getItem('${themeKey}'); document.documentElement.setAttribute('${themeKey}', savedTheme === '${themeKeys[0]}' || savedTheme === '${themeKeys[1]}' ? savedTheme : (matchMedia('(prefers-color-scheme: ${themeKeys[1]})').matches ? '${themeKeys[1]}' : '${themeKeys[0]}'));`}
    </script>
  );
}
