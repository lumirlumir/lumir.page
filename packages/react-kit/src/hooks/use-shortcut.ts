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
// Typedef
// --------------------------------------------------------------------------------

/**
 * Modifier key states required by `useShortcut`.
 */
export interface UseShortcutOptions {
  /**
   * Whether the Ctrl key must be active.
   * @default false
   */
  ctrlKey?: boolean;

  /**
   * Whether the Command key must be active.
   * @default false
   */
  metaKey?: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook that runs a callback when a keyboard shortcut is pressed.
 *
 * Key matching is case-insensitive. When the shortcut matches, the browser's
 * default action is prevented before the callback runs. Keyboard events from
 * editable controls are ignored.
 *
 * @param key The shortcut key.
 * @param callback The function to run when the shortcut is pressed.
 * @param options Required Ctrl and Command key states. Both default to `false`.
 *
 * @example
 * ```tsx
 * import { useShortcut } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   useShortcut('k', () => {
 *     console.log('Shortcut pressed');
 *   }, { ctrlKey: true });
 *
 *   return <div>Press Ctrl+K</div>;
 * }
 * ```
 */
export function useShortcut(
  key: string,
  callback: () => void,
  { ctrlKey = false, metaKey = false }: UseShortcutOptions = {},
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      if (
        event.ctrlKey === ctrlKey &&
        event.metaKey === metaKey &&
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
  }, [ctrlKey, metaKey, key, callback]);
}
