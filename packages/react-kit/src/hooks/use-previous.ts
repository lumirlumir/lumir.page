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
 * `usePrevious` is a React hook that returns the value from the immediately preceding render.
 *
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The value from the immediately preceding render, or the current value on the initial render.
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
  // Without `'use no memo'`, React Compiler throws when `panicThreshold` is not `'none'`
  // because this hook intentionally reads `ref.current` during render.
  'use no memo';

  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs -- Intentionally reads the value captured before this render's effect.
  return ref.current;
}
