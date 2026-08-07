/**
 * @fileoverview Type test for `use-boolean-state.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useBooleanState } from './use-boolean-state.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useBooleanState

({}) as typeof useBooleanState satisfies Function;
({}) as Parameters<typeof useBooleanState>[0] satisfies boolean | undefined;
({}) as ReturnType<typeof useBooleanState> satisfies readonly [
  boolean,
  () => void,
  () => void,
  () => void,
];

// @ts-expect-error - `useBooleanState` should be a function.
({}) as typeof useBooleanState satisfies boolean;
// @ts-expect-error - `useBooleanState` should be a function.
({}) as typeof useBooleanState satisfies string;

function useBooleanStateTypeTest() {
  useBooleanState();
  useBooleanState(false);
  useBooleanState(true);
  useBooleanState(undefined);

  // @ts-expect-error - `initialValue` should be a boolean.
  useBooleanState('false');
  // @ts-expect-error - `initialValue` should be a boolean.
  useBooleanState(0);
  // @ts-expect-error - `useBooleanState` accepts only one argument.
  useBooleanState(false, true);
}

// #endregion useBooleanState
// --------------------------------------------------------------------------------
