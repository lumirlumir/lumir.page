/**
 * @fileoverview `useToggle` hook.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/core/src/hooks/useToggle/useToggle.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Overload
// --------------------------------------------------------------------------------

/**
 * `useToggle` is a React hook that simplifies managing a boolean state.
 * It initializes the state to `false` and provides a function to toggle it
 * between `true` and `false`.
 *
 * @returns Current boolean state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [isOpen, toggleIsOpen] = useToggle();
 *
 *   return (
 *     <button type="button" onClick={toggleIsOpen}>
 *       {isOpen ? 'Close' : 'Open'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useToggle(): readonly [state: boolean, toggle: () => void];

/**
 * `useToggle` is a React hook that simplifies managing a boolean state.
 * It initializes the state with the provided boolean value and provides a
 * function to toggle it between `true` and `false`.
 *
 * @param initialValue The initial boolean state value.
 * @returns Current boolean state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [isOpen, toggleIsOpen] = useToggle(false);
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
  initialValue: boolean,
): readonly [state: boolean, toggle: () => void];

/**
 * `useToggle` is a React hook that simplifies managing a state with two
 * explicit values. It initializes the state with the initial value and provides
 * a function to toggle it between the first and second value.
 *
 * @param initialValue The initial state value.
 * @param firstValue The first state value.
 * @param secondValue The second state value to toggle to.
 * @returns Current state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * type Theme = 'dark' | 'light';
 *
 * function Component() {
 *   const [theme, toggleTheme] = useToggle<Theme>('light', 'dark', 'light');
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
  initialValue: NoInfer<T>,
  firstValue: T,
  secondValue: T,
): readonly [state: T, toggle: () => void];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function useToggle<const T>(
  initialValue: boolean | T = false,
  ...rest: [] | [firstValue: T, secondValue: T]
): readonly [state: boolean | T, toggle: () => void] {
  const [state, setState] = useState<boolean | T>(initialValue);

  const firstValue = rest.length !== 0 ? rest[0] : initialValue;
  const secondValue = rest.length !== 0 ? rest[1] : !initialValue;

  const toggle = useCallback(() => {
    setState(prevState => (Object.is(prevState, secondValue) ? firstValue : secondValue));
  }, [firstValue, secondValue]);

  return [state, toggle] as const;
}
