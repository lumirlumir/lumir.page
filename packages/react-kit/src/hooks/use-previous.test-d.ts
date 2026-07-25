/**
 * @fileoverview Type test for `use-previous.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { usePrevious } from './use-previous.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region usePrevious

({}) as typeof usePrevious satisfies Function;
({}) as typeof usePrevious satisfies <T>(value: T) => T;

// @ts-expect-error - `usePrevious` should be a function.
({}) as typeof usePrevious satisfies boolean;
// @ts-expect-error - `usePrevious` should be a function.
({}) as typeof usePrevious satisfies string;

function usePreviousTypeTest() {
  const previousNumber = usePrevious(0);
  const previousString = usePrevious('initial');
  const previousObject = usePrevious({ value: true });
  const previousUnion = usePrevious<number | string>(0);

  previousNumber satisfies number;
  previousString satisfies string;
  previousObject satisfies { value: boolean };
  previousUnion satisfies number | string;

  // @ts-expect-error - The value should match the explicit generic type.
  usePrevious<number>('0');
  // @ts-expect-error - `usePrevious` requires a value.
  usePrevious();
  // @ts-expect-error - `usePrevious` accepts only one argument.
  usePrevious(0, 1);
}

// #endregion usePrevious
// --------------------------------------------------------------------------------
