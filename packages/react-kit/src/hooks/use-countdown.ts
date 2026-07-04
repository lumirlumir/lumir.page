/**
 * @fileoverview `useCountdown` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
  useRef,
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
}

/**
 * Imperative countdown controls.
 */
export interface UseCountdownControls {
  /**
   * Sets the countdown duration and starts it when the duration is greater than zero.
   * Passing `0` stops the countdown without invoking `onComplete`.
   */
  set: (duration: number) => void;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Normalizes a millisecond value by ensuring it's a finite number and not negative.
 */
function normalizeMs(ms: number) {
  if (Number.isFinite(ms)) {
    return Math.max(0, ms);
  } else {
    return 0;
  }
}

/**
 * Reducer function to manage the countdown state based on dispatched actions.
 */
function countdownReducer(
  state: { isActive: boolean; remainingMs: number; runId: number },
  action: { type: 'sync'; remainingMs: number } | { type: 'set'; duration: number },
) {
  switch (action.type) {
    case 'sync': {
      return {
        ...state,
        isActive: action.remainingMs > 0,
        remainingMs: action.remainingMs,
      };
    }

    case 'set': {
      const remainingMs = normalizeMs(action.duration);

      return {
        isActive: remainingMs > 0,
        remainingMs,
        runId: state.runId + 1,
      };
    }

    default:
      return state;
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook for a controllable countdown.
 *
 * @param duration Initial countdown duration in milliseconds.
 * @example
 * ```tsx
 * import { useCountdown } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [remainingMs, countdown] = useCountdown(60_000, {
 *     onComplete: () => console.log('done'),
 *   });
 *
 *   return (
 *     <button type="button" onClick={() => countdown.set(60_000)}>
 *       {remainingMs}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCountdown(
  duration: number,
  { interval = 100, onComplete = undefined }: UseCountdownOptions = {},
): readonly [remaining: number, countdown: UseCountdownControls] {
  const normalizedDurationMs = normalizeMs(duration);
  const normalizedIntervalMs = normalizeMs(interval);

  const [state, dispatch] = useReducer(countdownReducer, normalizedDurationMs, ms => ({
    isActive: false,
    remainingMs: ms,
    runId: 0,
  }));
  const countdownTargetMsRef = useRef<number | null>(null);
  const remainingMsRef = useRef(state.remainingMs);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCompleteEvent = useEffectEvent(() => {
    onComplete?.();
  });

  useEffect(() => {
    remainingMsRef.current = state.remainingMs;
  }, [state.remainingMs]);

  useEffect(() => {
    if (!state.isActive || normalizedIntervalMs === 0) {
      return undefined;
    }

    countdownTargetMsRef.current ??= performance.now() + remainingMsRef.current;

    const tick = () => {
      const remainingMs = normalizeMs(
        (countdownTargetMsRef.current ?? performance.now()) - performance.now(),
      );

      dispatch({ type: 'sync', remainingMs });

      if (remainingMs === 0) {
        countdownTargetMsRef.current = null;
        timeoutRef.current = null;
        onCompleteEvent();
        return;
      }

      timeoutRef.current = setTimeout(tick, Math.min(normalizedIntervalMs, remainingMs));
    };

    timeoutRef.current = setTimeout(
      tick,
      Math.min(normalizedIntervalMs, remainingMsRef.current),
    );

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [normalizedIntervalMs, state.isActive, state.runId]);

  const set = useCallback((nextDuration: number) => {
    countdownTargetMsRef.current = null;
    dispatch({ type: 'set', duration: nextDuration });
  }, []);

  return [
    state.remainingMs,
    useMemo(
      () => ({
        set,
      }),
      [set],
    ),
  ] as const;
}
