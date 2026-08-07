/**
 * @fileoverview `useShortcut` hook.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook that runs a callback when a `Ctrl` or `Command` keyboard shortcut is pressed.
 *
 * Key matching is case-insensitive. When the shortcut matches, the browser's
 * default action is prevented before the callback runs.
 *
 * @param key The key to combine with Ctrl or Command.
 * @param callback The function to run when the shortcut is pressed.
 *
 * @example
 * ```tsx
 * import { useShortcut } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   useShortcut('k', () => {
 *     console.log('Shortcut pressed');
 *   });
 *
 *   return <div>Press Ctrl+K or Command+K</div>;
 * }
 * ```
 */
export function useShortcut(key: string, callback: () => void): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === key.toLowerCase()
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}
