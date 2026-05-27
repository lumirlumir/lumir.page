/**
 * @fileoverview `usePreviouses` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useEffectEvent, useLayoutEffect, useRef } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `usePreviouses` hook.
 */
export interface UsePreviousesOptions<T> {
  /**
   * Whether to only include distinct values in the returned previous values.
   * - `true` (default): Only include distinct values, excluding consecutive duplicates.
   * - `false`: Include all values, including consecutive duplicates.
   * @default true
   */
  distinct?: boolean;

  /**
   * The type of effect to use for tracking previous values.
   * - `'effect'` (default): Use `useEffect` to track previous values.
   * - `'layoutEffect'`: Use `useLayoutEffect` to track previous values.
   * @default 'effect'
   */
  effectType?: 'effect' | 'layoutEffect';

  /**
   * An optional comparison function to determine if the state has changed.
   * @param prev The previous value.
   * @param next The next value.
   * @returns `true` if the values are considered equal, `false` otherwise.
   * @default Object.is
   */
  compareFn?: (prev: T, next: T) => boolean;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const defaultCompareFn = Object.is;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `usePreviouses` hook to get the previous values of a state or prop.
 * The current value is excluded from the returned previous values, including same-value rerenders.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous values before the current render.
 * @example
 * ```tsx
 * import { usePreviouses } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const countPreviouses = usePreviouses(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function usePreviouses<T>(
  value: T,
  {
    distinct = true,
    effectType = 'effect',
    compareFn: compareFnProp = defaultCompareFn,
  }: UsePreviousesOptions<T> = {},
): T[] {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const previousesRef = useRef<T[]>([]);
  const currentValueRef = useRef<T>(value);

  const compareFn = useEffectEvent(compareFnProp);

  useEffect(() => {
    if (effectType === 'layoutEffect') {
      return;
    }

    if (distinct) {
      if (compareFn(currentValueRef.current, value)) return;

      previousesRef.current = [...previousesRef.current, currentValueRef.current];
      currentValueRef.current = value;
    } else {
      previousesRef.current = [...previousesRef.current, currentValueRef.current];
    }
  }, [value, distinct, effectType]);

  useLayoutEffect(() => {
    if (effectType === 'effect') {
      return;
    }

    if (distinct) {
      if (compareFn(currentValueRef.current, value)) return;

      previousesRef.current = [...previousesRef.current, currentValueRef.current];
      currentValueRef.current = value;
    } else {
      previousesRef.current = [...previousesRef.current, currentValueRef.current];
    }
  }, [value, distinct, effectType]);

  /* eslint-disable react-hooks/refs -- `usePrevious` intentionally reads the value captured before this render's effect. */
  if (distinct) {
    return compareFnProp(currentValueRef.current, value)
      ? previousesRef.current
      : [...previousesRef.current, currentValueRef.current];
  } else {
    return previousesRef.current;
  }
  /* eslint-enable react-hooks/refs */
}
