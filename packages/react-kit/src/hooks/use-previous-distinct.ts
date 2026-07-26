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
 * current distinct value when `history` is enabled. It preserves the accumulated
 * history while the input is considered equivalent to the most recently tracked
 * value. A `compareFn` function can be provided when values require custom
 * equality semantics. By default, values are compared using `Object.is`.
 *
 * @param value The current value to track.
 * @param options Options containing `history: true` and the optional `compareFn`,
 * which defaults to `Object.is`.
 * @template T The type of the value.
 * @returns All previous distinct values, or an empty array on the initial render.
 * @example
 * ```tsx
 * import { usePreviousDistinct } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const previousCounts = usePreviousDistinct(count, { history: true });
 *   // Your component logic here...
 * }
 * ```
 */
export function usePreviousDistinct<T>(
  value: T,
  options: UsePreviousDistinctOptions<T> & { history: true },
): readonly T[];

/**
 * `usePreviousDistinct` is a React hook that returns either the value preceding
 * the current distinct value or all values preceding it, depending on the initial
 * `history` option. The initial mode is preserved for the lifetime of the hook.
 * A `compareFn` function can be provided when values require custom equality
 * semantics. By default, values are compared using `Object.is`.
 *
 * @param value The current value to track.
 * @param options Options controlling comparison and whether to return all previous
 * distinct values.
 * @template T The type of the value.
 * @returns The previous distinct value when `history` is `false`, or all previous
 * distinct values when `history` is `true`.
 * @example
 * ```tsx
 * import { usePreviousDistinct } from '@lumir/react-kit/hooks';
 *
 * function Component({ count, history }: { count: number, history: boolean }) {
 *   const previousCounts = usePreviousDistinct(count, { history });
 *   // Your component logic here...
 * }
 * ```
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

  // Intentionally preserve the initial `history` mode because changing it
  // via state or props would alter the hook's return shape.
  const initialHistoryRef = useRef<boolean>(history);
  const previousValueRef = useRef<T | readonly T[]>(history ? [] : value);
  const currentValueRef = useRef<T>(value);

  useEffect(() => {
    if (!compareFn(currentValueRef.current, value)) {
      previousValueRef.current = initialHistoryRef.current
        ? [...(previousValueRef.current as readonly T[]), currentValueRef.current]
        : currentValueRef.current;
      currentValueRef.current = value;
    }
  }, [value, compareFn]);

  /* eslint-disable react-hooks/refs -- Intentionally reads the value captured before this render's effect. */
  return compareFn(currentValueRef.current, value)
    ? previousValueRef.current
    : initialHistoryRef.current
      ? [...(previousValueRef.current as readonly T[]), currentValueRef.current]
      : currentValueRef.current;
  /* eslint-enable react-hooks/refs */
}
