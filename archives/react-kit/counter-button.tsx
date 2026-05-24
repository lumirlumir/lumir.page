/**
 * @fileoverview `CounterButton` component.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Props for `CounterButton` component.
 */
export interface CounterButtonProps {
  /**
   * Initial value of the counter.
   * @default 0
   */
  initialValue?: number;
}

/**
 * `CounterButton` component that displays a button which increments a counter each time it's clicked.
 * @param props Props for the component.
 * @returns A `button` element.
 * @example
 * ```tsx
 * import { CounterButton } from 'react-kit/components';
 *
 * // Default Value
 * <CounterButton initialValue={0} />
 * ```
 */
export function CounterButton({ initialValue = 0 }: CounterButtonProps) {
  const [count, setCount] = useState(initialValue);

  return <button onClick={() => setCount(x => x + 1)}>{count}번 눌렸어요</button>;
}
