/**
 * @fileoverview theme-script.
 */

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
export default function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger -- Safe because the script is hardcoded and does not include any user input.
      dangerouslySetInnerHTML={{
        __html: `
function getTheme() {
  const themeLocalStorage = localStorage.getItem('data-theme');

  if(themeLocalStorage) return themeLocalStorage;

  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

document.documentElement.setAttribute('data-theme', getTheme());
`.trim(),
      }}
    />
  );
}
