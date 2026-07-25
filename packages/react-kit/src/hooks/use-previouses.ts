/**
 * @fileoverview `usePreviouses` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef } from 'react';

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
export function usePreviouses<T>(value: T): T[] {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const previousesRef = useRef<T[]>([]);
  const currentValueRef = useRef<T>(value);

  useEffect(() => {
    previousesRef.current = [...previousesRef.current, currentValueRef.current];
    currentValueRef.current = value;
  }, [value]);

  /* eslint-disable react-hooks/refs -- `usePreviouses` intentionally reads the value captured before this render's effect. */
  return previousesRef.current;
  /* eslint-enable react-hooks/refs */
}
