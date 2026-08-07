/**
 * @fileoverview Type test for `use-shortcut.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useShortcut } from './use-shortcut.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useShortcut

({}) as typeof useShortcut satisfies (key: string, callback: () => void) => void;

// @ts-expect-error - `useShortcut` should be a function.
({}) as typeof useShortcut satisfies boolean;
// @ts-expect-error - `useShortcut` should be a function.
({}) as typeof useShortcut satisfies string;

function useShortcutTypeTest() {
  useShortcut('k', () => undefined);
  useShortcut('Enter', () => undefined);

  // @ts-expect-error - `key` should be a string.
  useShortcut(1, () => undefined);
  // @ts-expect-error - `callback` should be a function with no required arguments.
  useShortcut('k', (value: string) => value);
  // @ts-expect-error - `callback` is required.
  useShortcut('k');
  // @ts-expect-error - `useShortcut` accepts only two arguments.
  useShortcut('k', () => undefined, true);
}

// #endregion useShortcut
// --------------------------------------------------------------------------------
