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
 * Modifier key requirements and editable-control behavior for `useShortcut`.
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

  /**
   * Whether to ignore keyboard events from editable controls.
   * @default true
   */
  ignoreEditable?: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook that runs a callback when a keyboard shortcut is pressed.
 *
 * Key matching is case-insensitive. When the shortcut matches, the browser's
 * default action is prevented before the callback runs. Keyboard events from
 * editable controls are ignored by default.
 *
 * @param key The shortcut key.
 * @param callback The function to run when the shortcut is pressed.
 * @param options Required modifier key states and whether to ignore editable controls.
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
  { ctrlKey = false, metaKey = false, ignoreEditable = true }: UseShortcutOptions = {},
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ignoreEditable &&
        (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement ||
          (event.target instanceof HTMLElement && event.target.isContentEditable))
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
  }, [ctrlKey, metaKey, ignoreEditable, key, callback]);
}
