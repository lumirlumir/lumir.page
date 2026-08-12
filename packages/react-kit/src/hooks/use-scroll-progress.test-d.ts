/**
 * @fileoverview Type test for `use-scroll-progress.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useScrollProgress } from './use-scroll-progress.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useScrollProgress

({}) as typeof useScrollProgress satisfies (
  onProgress: (progress: number) => void,
) => void;

// @ts-expect-error - `useScrollProgress` should be a function.
({}) as typeof useScrollProgress satisfies boolean;
// @ts-expect-error - `useScrollProgress` should be a function.
({}) as typeof useScrollProgress satisfies string;

function useScrollProgressTypeTest() {
  useScrollProgress(() => undefined);
  useScrollProgress(progress => {
    progress satisfies number;
  });

  // @ts-expect-error - `onProgress` is required.
  useScrollProgress();
  // @ts-expect-error - `onProgress` should be a function.
  useScrollProgress(true);
  // @ts-expect-error - `progress` should be a number.
  useScrollProgress((progress: string) => progress);
  // @ts-expect-error - `useScrollProgress` accepts only one argument.
  useScrollProgress(() => undefined, {});
}

// #endregion useScrollProgress
// --------------------------------------------------------------------------------
