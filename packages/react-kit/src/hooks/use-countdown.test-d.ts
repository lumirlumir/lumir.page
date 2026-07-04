/**
 * @fileoverview Type test for `use-countdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCountdown, type UseCountdownOptions } from './use-countdown.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseCountdownOptions

let options: UseCountdownOptions;

options = {};
options = { interval: 100 };
options = { onComplete: () => {} };
options = { onTick: () => {} };
options = {
  interval: 100,
  onComplete: () => {},
  onTick: () => {},
};

// @ts-expect-error - `initialCount` is passed as the first argument, not as an option.
options = { initialCount: 1_000 };
// @ts-expect-error - `interval` should be a number.
options = { interval: '100' };
// @ts-expect-error - `onComplete` should be a function.
options = { onComplete: true };
// @ts-expect-error - `onTick` should be a function.
options = { onTick: true };
// @ts-expect-error - `unknown` is not a valid property of `UseCountdownOptions`.
options = { unknown: 'unknown' };

// #endregion UseCountdownOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useCountdown

({}) as typeof useCountdown satisfies Function;
({}) as Parameters<typeof useCountdown>[0] satisfies number;
({}) as Parameters<typeof useCountdown>[1] satisfies UseCountdownOptions | undefined;
({}) as ReturnType<typeof useCountdown> satisfies readonly [
  number,
  (duration: number) => void,
];

// @ts-expect-error - `useCountdown` should be a function.
({}) as typeof useCountdown satisfies boolean;
// @ts-expect-error - `useCountdown` should be a function.
({}) as typeof useCountdown satisfies string;

function useCountdownTypeTest() {
  useCountdown(1_000);
  useCountdown(1_000, undefined);
  useCountdown(1_000, {});
  useCountdown(1_000, { interval: 100 });
  useCountdown(1_000, { onComplete: () => {} });
  useCountdown(1_000, { onTick: () => {} });

  const [currentCount, setCurrentCount] = useCountdown(1_000);
  currentCount satisfies number;
  setCurrentCount satisfies (duration: number) => void;

  setCurrentCount(0);
  setCurrentCount(1_000);
  setCurrentCount(prevCount => prevCount + 1_000);

  // @ts-expect-error - `useCountdown` requires initialCount.
  useCountdown();
  // @ts-expect-error - `initialCount` should be a number.
  useCountdown('1000');
  // @ts-expect-error - `initialCount` should be passed as the first argument.
  useCountdown({ initialCount: 1_000 });
  // @ts-expect-error - `initialCount` should not be included in options.
  useCountdown(1_000, { initialCount: 1_000 });
  // @ts-expect-error - `interval` should be a number.
  useCountdown(1_000, { interval: '100' });
  // @ts-expect-error - `onComplete` should be a function.
  useCountdown(1_000, { onComplete: true });
  // @ts-expect-error - `onTick` should be a function.
  useCountdown(1_000, { onTick: true });
  // @ts-expect-error - `setCurrentCount` requires a number.
  setCurrentCount('0');
}

// #endregion useCountdown
// --------------------------------------------------------------------------------
