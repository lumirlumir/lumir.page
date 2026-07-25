/**
 * @fileoverview `usePreviousDistinct` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `usePreviousDistinct` hook.
 */
export interface UsePreviousDistinctOptions<T> {
  /**
   * An optional comparison function that determines whether two values are equivalent.
   * @param prev The most recently tracked distinct value.
   * @param next The current input value.
   * @returns `true` if the values are considered equal, `false` otherwise.
   * @default Object.is
   */
  compareFn?: (prev: T, next: T) => boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `usePreviousDistinct` is a React hook that returns the value preceding the
 * current distinct value. It preserves the previous distinct value while the
 * input is considered equivalent to the most recently tracked value.
 * A `compareFn` function can be provided when values require custom equality
 * semantics. By default, values are compared using `Object.is`.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous distinct value, or the current value on the initial render.
 * @example
 * ```tsx
 * import { usePreviousDistinct } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const previousCount = usePreviousDistinct(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function usePreviousDistinct<T>(
  value: T,
  { compareFn = Object.is }: UsePreviousDistinctOptions<T> = {},
): T {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const previousValueRef = useRef<T>(value);
  const currentValueRef = useRef<T>(value);

  useEffect(() => {
    if (!compareFn(currentValueRef.current, value)) {
      previousValueRef.current = currentValueRef.current;
      currentValueRef.current = value;
    }
  }, [value, compareFn]);

  // eslint-disable-next-line react-hooks/refs -- Intentionally reads the value captured before this render's effect.
  return compareFn(currentValueRef.current, value)
    ? previousValueRef.current
    : currentValueRef.current;
}
