/**
 * @fileoverview `usePrevious` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `usePrevious` hook to get the previous value of a state or prop.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous value before the current render.
 * @example
 * ```tsx
 * import { usePrevious } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const previousCount = usePrevious(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs -- `usePrevious` intentionally reads the value captured before this render's effect.
  return ref.current;
}
