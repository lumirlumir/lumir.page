/**
 * @fileoverview `useToggle` hook.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/core/src/hooks/useToggle/useToggle.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for toggling between two explicit values.
 */
export interface UseToggleOptions<T> {
  /**
   * The first state value.
   */
  firstValue: T;

  /**
   * The second state value to toggle to.
   */
  secondValue: T;
}

// --------------------------------------------------------------------------------
// Overload
// --------------------------------------------------------------------------------

/**
 * `useToggle` is a React hook that simplifies managing a boolean state.
 * It initializes the state to `false` by default, or with the provided boolean
 * value, and provides a function to toggle it between `true` and `false`.
 *
 * @param initialValue The optional initial boolean state value. (default: `false`)
 * @returns Current boolean state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [isOpen, toggleIsOpen] = useToggle(); // You can also pass an initial value: `useToggle(true)`
 *
 *   return (
 *     <button type="button" onClick={toggleIsOpen}>
 *       {isOpen ? 'Close' : 'Open'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useToggle(
  initialValue?: boolean,
): readonly [state: boolean, toggle: () => void];

/**
 * `useToggle` is a React hook that simplifies managing a state with two
 * explicit values. It initializes the state with the initial value or a
 * function that returns it, and provides a function to toggle it between the
 * first and second value.
 *
 * @param initialValue The initial state value or a function that returns it.
 * @param options Explicit values used for toggling.
 * @returns Current state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * type Theme = 'dark' | 'light';
 *
 * function Component() {
 *   const [theme, toggleTheme] = useToggle<Theme>(() => 'light', {
 *     firstValue: 'dark',
 *     secondValue: 'light',
 *   });
 *
 *   return (
 *     <button type="button" onClick={toggleTheme}>
 *       {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useToggle<const T>(
  initialValue: NoInfer<T> | (() => NoInfer<T>),
  options: UseToggleOptions<T>,
): readonly [state: T, toggle: () => void];

// --------------------------------------------------------------------------------
// Export: Implementation
// --------------------------------------------------------------------------------

export function useToggle<const T>(
  initialValue: boolean | T | (() => T) = false,
  options?: UseToggleOptions<T>,
): readonly [state: boolean | T, toggle: () => void] {
  const [state, setState] = useState<boolean | T>(initialValue);

  const firstValue = options === undefined ? !!initialValue : options.firstValue;
  const secondValue = options === undefined ? !initialValue : options.secondValue;

  const toggle = useCallback(() => {
    setState(prevState => (Object.is(prevState, secondValue) ? firstValue : secondValue));
  }, [firstValue, secondValue]);

  return [state, toggle] as const;
}
