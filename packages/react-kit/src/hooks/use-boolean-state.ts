/**
 * @fileoverview `useBooleanState` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useBooleanState` hook to manage a boolean state with utility functions.
 *
 * @param initialValue The initial boolean state value. Default is `false`.
 * @returns A tuple containing the current boolean value, a function to toggle it, a function to set it to `true`, and a function to set it to `false`, in that order.
 * @example
 * ```tsx
 * import { useBooleanState } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [isVisible, toggleIsVisible, showIsVisible, hideIsVisible] = useBooleanState(false);
 *   // Your component logic here...
 * }
 * ```
 */
export function useBooleanState(
  initialValue = false,
): readonly [
  state: boolean,
  toggle: () => void,
  setTrue: () => void,
  setFalse: () => void,
] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return [state, toggle, setTrue, setFalse] as const;
}
