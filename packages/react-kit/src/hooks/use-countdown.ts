/**
 * @fileoverview `useCountdown` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  useEffect,
  useEffectEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `useCountdown` hook.
 */
export interface UseCountdownOptions {
  /**
   * Interval between countdown updates in milliseconds.
   * @default 100
   */
  interval?: number | undefined;

  /**
   * Callback function invoked when the countdown reaches zero.
   * @default undefined
   */
  onComplete?: (() => void) | undefined;

  /**
   * Callback function invoked on each countdown tick.
   * @default undefined
   */
  onTick?: (() => void) | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Countdown timer hook.
 *
 * @param initialCount Initial countdown duration in milliseconds.
 * @param options Options for the countdown timer.
 * @returns A readonly tuple containing the current countdown value and a function to reset the countdown.
 *
 * @example
 * ```tsx
 * import { useCountdown, type UseCountdownOptions } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [currentCount, setCurrentCount] = useCountdown(60_000, {
 *     interval: 100,
 *     onComplete: () => console.log('done'),
 *     onTick: () => console.log('tick'),
 *   });
 *
 *   return (
 *     <button type="button" onClick={() => setCurrentCount(60_000)}>
 *       {currentCount}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCountdown(
  initialCount: number,
  {
    interval = 100,
    onComplete: onCompleteProp = undefined,
    onTick: onTickProp = undefined,
  }: UseCountdownOptions = {},
): readonly [currentCount: number, setCurrentCount: Dispatch<SetStateAction<number>>] {
  const [currentCount, setCurrentCount] = useState<number>(initialCount);

  const onComplete = useEffectEvent(() => {
    onCompleteProp?.();
  });
  const onTick = useEffectEvent(() => {
    onTickProp?.();
  });

  useEffect(() => {
    if (currentCount === 0) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      const nextCount = Math.max(currentCount - interval, 0);

      setCurrentCount(nextCount);
      onTick();

      if (nextCount === 0) {
        onComplete();
      }
    }, interval);

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentCount, interval]);

  return [currentCount, setCurrentCount] as const;
}
