/**
 * @fileoverview Type test for `use-shortcut.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useShortcut, type UseShortcutOptions } from './use-shortcut.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseShortcutOptions

let options: UseShortcutOptions;

options = {};
options = { ctrlKey: true };
options = { metaKey: true };
options = { ctrlKey: true, metaKey: false };

// @ts-expect-error - `ctrlKey` should be a boolean.
options = { ctrlKey: 'true' };
// @ts-expect-error - `metaKey` should be a boolean.
options = { metaKey: 'true' };
// @ts-expect-error - `unknown` is not a valid property of `UseShortcutOptions`.
options = { unknown: true };

// #endregion UseShortcutOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useShortcut

({}) as typeof useShortcut satisfies (
  key: string,
  callback: () => void,
  options?: UseShortcutOptions,
) => void;

// @ts-expect-error - `useShortcut` should be a function.
({}) as typeof useShortcut satisfies boolean;
// @ts-expect-error - `useShortcut` should be a function.
({}) as typeof useShortcut satisfies string;

function useShortcutTypeTest() {
  useShortcut('k', () => undefined);
  useShortcut('Enter', () => undefined);
  useShortcut('k', () => undefined, {});
  useShortcut('k', () => undefined, { ctrlKey: true });
  useShortcut('k', () => undefined, { metaKey: true });
  useShortcut('k', () => undefined, { ctrlKey: true, metaKey: false });

  // @ts-expect-error - `key` should be a string.
  useShortcut(1, () => undefined);
  // @ts-expect-error - `callback` should be a function with no required arguments.
  useShortcut('k', (value: string) => value);
  // @ts-expect-error - `callback` is required.
  useShortcut('k');
  // @ts-expect-error - `options` should be an object.
  useShortcut('k', () => undefined, true);
  // @ts-expect-error - `useShortcut` accepts only three arguments.
  useShortcut('k', () => undefined, {}, true);
}

// #endregion useShortcut
// --------------------------------------------------------------------------------
