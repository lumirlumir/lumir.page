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

  /**
   * Whether to return all previous distinct values.
   * @default false
   */
  history?: boolean;
}

// --------------------------------------------------------------------------------
// Overload
// --------------------------------------------------------------------------------

/**
 * `usePreviousDistinct` is a React hook that returns the value preceding the
 * current distinct value. It preserves the previous distinct value while the
 * input is considered equivalent to the most recently tracked value.
 * A `compareFn` function can be provided when values require custom equality
 * semantics. By default, values are compared using `Object.is`.
 *
 * @param value The current value to track.
 * @param options Options containing the optional `compareFn`, which defaults to `Object.is`.
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
  options?: UsePreviousDistinctOptions<T> & { history?: false },
): T;

/**
 * `usePreviousDistinct` is a React hook that returns all values preceding the
 * current distinct value when `history` is enabled.
 *
 * TODO
 *
 * @param value The current value to track.
 * @param options Options containing `history: true` and the optional `compareFn`.
 * @template T The type of the value.
 * @returns All previous distinct values, or an empty array on the initial render.
 */
export function usePreviousDistinct<T>(
  value: T,
  options: UsePreviousDistinctOptions<T> & { history: true },
): readonly T[];

/**
 * TODO
 * @param value
 * @param options
 */
export function usePreviousDistinct<T>(
  value: T,
  options: UsePreviousDistinctOptions<T>,
): T | readonly T[];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function usePreviousDistinct<T>(
  value: T,
  { compareFn = Object.is, history = false }: UsePreviousDistinctOptions<T> = {},
): T | readonly T[] {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const historyRef = useRef<boolean>(history); // TODO: add test
  const previousValueRef = useRef<T | readonly T[]>(history ? [] : value);
  const currentValueRef = useRef<T>(value);

  useEffect(() => {
    if (!compareFn(currentValueRef.current, value)) {
      previousValueRef.current = historyRef.current
        ? [...(previousValueRef.current as readonly T[]), currentValueRef.current]
        : currentValueRef.current;

      currentValueRef.current = value;
    }
  }, [value, compareFn]);

  /* eslint-disable react-hooks/refs -- Intentionally reads the values captured before this render's effect. */
  return compareFn(currentValueRef.current, value)
    ? previousValueRef.current
    : historyRef.current
      ? [...(previousValueRef.current as readonly T[]), currentValueRef.current]
      : currentValueRef.current;
  /* eslint-enable react-hooks/refs */
}
