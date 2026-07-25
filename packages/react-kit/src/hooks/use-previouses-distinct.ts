/**
 * @fileoverview `usePreviousesDistinct` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useEffectEvent, useRef } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `usePreviousesDistinct` hook.
 */
export interface UsePreviousesDistinctOptions<T> {
  /**
   * Whether to only include distinct values in the returned previous values.
   * - `true` (default): Only include distinct values, excluding consecutive duplicates.
   * - `false`: Include all values, including consecutive duplicates.
   * @default true
   */
  distinct?: boolean;

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
// Export
// --------------------------------------------------------------------------------

/**
 * `usePreviousesDistinct` hook to get the previous values of a state or prop.
 * The current value is excluded from the returned previous values, including same-value rerenders.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous values before the current render.
 * @example
 * ```tsx
 * import { usePreviousesDistinct } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const countPreviousesDistinct = usePreviousesDistinct(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function usePreviousesDistinct<T>(
  value: T,
  {
    distinct = true,
    compareFn: compareFnProp = Object.is,
  }: UsePreviousesDistinctOptions<T> = {},
): T[] {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const previousesRef = useRef<T[]>([]);
  const currentValueRef = useRef<T>(value);
  const compareFn = useEffectEvent(compareFnProp);

  useEffect(() => {
    if (distinct) {
      if (compareFn(currentValueRef.current, value)) return;

      previousesRef.current = [...previousesRef.current, currentValueRef.current];
      currentValueRef.current = value;
    } else {
      previousesRef.current = [...previousesRef.current, currentValueRef.current];
    }
  }, [value, distinct]);

  /* eslint-disable react-hooks/refs -- `usePreviousesDistinct` intentionally reads the value captured before this render's effect. */
  if (distinct) {
    return compareFnProp(currentValueRef.current, value)
      ? previousesRef.current
      : [...previousesRef.current, currentValueRef.current];
  } else {
    return previousesRef.current;
  }
  /* eslint-enable react-hooks/refs */
}
