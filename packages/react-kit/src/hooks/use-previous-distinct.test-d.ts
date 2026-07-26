/**
 * @fileoverview Type test for `use-previous-distinct.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  usePreviousDistinct,
  type UsePreviousDistinctOptions,
} from './use-previous-distinct.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UsePreviousDistinctOptions

let options: UsePreviousDistinctOptions<number>;

options = {};
options = { compareFn: Object.is };
options = { history: false };
options = { history: true };
options = {
  compareFn: (prev, next) => {
    prev satisfies number;
    next satisfies number;
    return prev === next;
  },
  history: true,
};

// @ts-expect-error - `compareFn` parameters should match the value type.
options = { compareFn: (prev: string, next: string) => prev === next };
// @ts-expect-error - `compareFn` should return a boolean.
options = { compareFn: (prev, next) => Number(prev === next) };
// @ts-expect-error - `unknown` is not a valid property of `UsePreviousDistinctOptions`.
options = { unknown: 'unknown' };

// #endregion UsePreviousDistinctOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region usePreviousDistinct

({}) as typeof usePreviousDistinct satisfies Function;
({}) as typeof usePreviousDistinct satisfies {
  <T>(value: T, options?: UsePreviousDistinctOptions<T> & { history?: false }): T;
  <T>(value: T, options: UsePreviousDistinctOptions<T> & { history: true }): T[];
  <T>(value: T, options: UsePreviousDistinctOptions<T>): T | T[];
};

// @ts-expect-error - `usePreviousDistinct` should be a function.
({}) as typeof usePreviousDistinct satisfies boolean;
// @ts-expect-error - `usePreviousDistinct` should be a function.
({}) as typeof usePreviousDistinct satisfies string;

function usePreviousDistinctTypeTest() {
  const previousNumber = usePreviousDistinct(0);
  const previousString = usePreviousDistinct('initial');
  const previousObject = usePreviousDistinct({ value: true });
  const previousUnion = usePreviousDistinct<number | string>(0);
  const previousNumberHistory = usePreviousDistinct(0, { history: true });
  const previousStringHistory = usePreviousDistinct('initial', { history: true });
  const dynamicHistory = usePreviousDistinct(0, { history: Boolean(0) });

  previousNumber satisfies number;
  previousString satisfies string;
  previousObject satisfies { value: boolean };
  previousUnion satisfies number | string;
  previousNumberHistory satisfies readonly number[];
  previousStringHistory satisfies readonly string[];
  dynamicHistory satisfies number | readonly number[];

  usePreviousDistinct(0, undefined);
  usePreviousDistinct(0, {});
  usePreviousDistinct(0, { compareFn: Object.is });
  usePreviousDistinct(0, { history: false });
  usePreviousDistinct(0, { history: true });
  usePreviousDistinct(0, {
    compareFn: (prev, next) => {
      prev satisfies number;
      next satisfies number;
      return prev === next;
    },
    history: true,
  });

  // @ts-expect-error - The value should match the explicit generic type.
  usePreviousDistinct<number>('0');
  // @ts-expect-error - `compareFn` parameters should match the value type.
  usePreviousDistinct(0, { compareFn: (prev: string, next: string) => prev === next });
  // @ts-expect-error - `compareFn` should return a boolean.
  usePreviousDistinct(0, { compareFn: (prev, next) => Number(prev === next) });
  // @ts-expect-error - `history` should be a boolean.
  usePreviousDistinct(0, { history: 'true' });
  // @ts-expect-error - `unknown` is not a valid option.
  usePreviousDistinct(0, { unknown: 'unknown' });
  // @ts-expect-error - `usePreviousDistinct` requires a value.
  usePreviousDistinct();
  // @ts-expect-error - `usePreviousDistinct` accepts only two arguments.
  usePreviousDistinct(0, {}, {});
}

// #endregion usePreviousDistinct
// --------------------------------------------------------------------------------
