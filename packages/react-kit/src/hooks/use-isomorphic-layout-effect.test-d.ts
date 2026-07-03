/**
 * @fileoverview Type test for `use-isomorphic-layout-effect.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  useEffect,
  useLayoutEffect,
  type DependencyList,
  type EffectCallback,
} from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useIsomorphicLayoutEffect

({}) as typeof useIsomorphicLayoutEffect satisfies typeof useEffect;
({}) as typeof useIsomorphicLayoutEffect satisfies typeof useLayoutEffect;
({}) as Parameters<typeof useIsomorphicLayoutEffect>[0] satisfies EffectCallback;
({}) as Parameters<typeof useIsomorphicLayoutEffect>[1] satisfies
  DependencyList | undefined;
({}) as unknown as ReturnType<typeof useIsomorphicLayoutEffect> satisfies void;

// @ts-expect-error - `useIsomorphicLayoutEffect` should be a function.
({}) as typeof useIsomorphicLayoutEffect satisfies boolean;
// @ts-expect-error - `useIsomorphicLayoutEffect` should be a function.
({}) as typeof useIsomorphicLayoutEffect satisfies string;

function useIsomorphicLayoutEffectTypeTest() {
  useIsomorphicLayoutEffect(() => {});
  useIsomorphicLayoutEffect(() => undefined, []);
  useIsomorphicLayoutEffect(() => () => {}, [true, 'dependency']);

  // @ts-expect-error - `useIsomorphicLayoutEffect` requires an effect callback.
  useIsomorphicLayoutEffect();
  // @ts-expect-error - The effect should be a function.
  useIsomorphicLayoutEffect(undefined);
  // @ts-expect-error - The dependencies should be an array.
  useIsomorphicLayoutEffect(() => {}, 'dependency');
}

// #endregion useIsomorphicLayoutEffect
// --------------------------------------------------------------------------------
