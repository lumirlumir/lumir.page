/**
 * @fileoverview Type test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useToggle, type UseToggleOptions } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseToggleOptions

let options: UseToggleOptions<'dark' | 'light'>;

options = { firstValue: 'dark', secondValue: 'light' };
options = { firstValue: 'light', secondValue: 'dark' };

// @ts-expect-error - `firstValue` is required.
options = { secondValue: 'light' };
// @ts-expect-error - `secondValue` is required.
options = { firstValue: 'dark' };
// @ts-expect-error - `firstValue` should match the toggle value type.
options = { firstValue: 'system', secondValue: 'light' };
// @ts-expect-error - `secondValue` should match the toggle value type.
options = { firstValue: 'dark', secondValue: 'system' };
// @ts-expect-error - `unknown` is not a valid property of `UseToggleOptions`.
options = { firstValue: 'dark', secondValue: 'light', unknown: 'unknown' };

// #endregion UseToggleOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useToggle

({}) as typeof useToggle satisfies Function;

// @ts-expect-error - `useToggle` should be a function.
({}) as typeof useToggle satisfies boolean;
// @ts-expect-error - `useToggle` should be a function.
({}) as typeof useToggle satisfies string;

function useToggleTypeTest() {
  useToggle();
  useToggle(false);
  useToggle(true);
  useToggle('open', { firstValue: 'closed', secondValue: 'open' });
  useToggle(() => 'open', { firstValue: 'closed', secondValue: 'open' });
  useToggle<'dark' | 'light'>('light', { firstValue: 'dark', secondValue: 'light' });

  const [bool, toggleBool] = useToggle();
  bool satisfies boolean;
  toggleBool satisfies () => void;

  const [theme, toggleTheme] = useToggle<'dark' | 'light'>('light', {
    firstValue: 'dark',
    secondValue: 'light',
  });
  theme satisfies 'dark' | 'light';
  toggleTheme satisfies () => void;

  // @ts-expect-error - Explicit values should be passed as options.
  useToggle('open', 'closed', 'open');
  // @ts-expect-error - `initialValue` should be boolean when options are omitted.
  useToggle('open');
  // @ts-expect-error - `initialValue` should match the toggle value type.
  useToggle<'dark' | 'light'>('system', { firstValue: 'dark', secondValue: 'light' });
  // @ts-expect-error - `firstValue` should match the toggle value type.
  useToggle<'dark' | 'light'>('light', { firstValue: 'system', secondValue: 'light' });
  // @ts-expect-error - `secondValue` should match the toggle value type.
  useToggle<'dark' | 'light'>('light', { firstValue: 'dark', secondValue: 'system' });
  // @ts-expect-error - Options should include `firstValue`.
  useToggle('open', { secondValue: 'closed' });
  // @ts-expect-error - Options should include `secondValue`.
  useToggle('open', { firstValue: 'open' });
}

// #endregion useToggle
// --------------------------------------------------------------------------------
