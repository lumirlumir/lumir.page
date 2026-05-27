/**
 * @fileoverview `useHistory` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useLayoutEffect, useRef } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useHistory` hook to get the previous values of a state or prop.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous values before the current render.
 * @example
 * ```tsx
 * import { useHistory } from '@lumir/react-kit/hooks';
 *
 * function Component({ count }: { count: number }) {
 *   const countHistory = useHistory(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function useHistory<T>(value: T): T[] {
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const ref = useRef<T[]>([]);

  useLayoutEffect(() => {
    ref.current = [...ref.current, value];
  }, [value]);

  // eslint-disable-next-line react-hooks/refs -- `useHistory` intentionally reads the value captured before this render's effect.
  return ref.current;
}
