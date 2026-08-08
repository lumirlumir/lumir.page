/**
 * @fileoverview Type test for `use-os.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useOs, type UseOsReturn } from './use-os.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseOsReturnValue

let os: UseOsReturn;

os = 'undetermined';
os = 'macos';
os = 'ios';
os = 'windows';
os = 'android';
os = 'linux';
os = 'chromeos';

// @ts-expect-error - `mac` is not a valid `UseOsReturnValue`.
os = 'mac';
// @ts-expect-error - `UseOsReturnValue` should be a string union.
os = true;

// #endregion UseOsReturnValue
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useOs

({}) as typeof useOs satisfies () => UseOsReturn;
({}) as ReturnType<typeof useOs> satisfies UseOsReturn;

// @ts-expect-error - `useOs` should be a function.
({}) as typeof useOs satisfies boolean;
// @ts-expect-error - `useOs` should be a function.
({}) as typeof useOs satisfies string;

function useOsTypeTest() {
  useOs();

  const value = useOs();
  value satisfies UseOsReturn;

  // @ts-expect-error - `useOs` does not accept arguments.
  useOs({});
}

// #endregion useOs
// --------------------------------------------------------------------------------
