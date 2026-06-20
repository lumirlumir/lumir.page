/**
 * @fileoverview `useTypewriter` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useEffectEvent, useRef, useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Type of the current mode, either `'write'` or `'erase'`.
 */
type Mode = 'write' | 'erase';

/**
 * Options for the `useTypewriter` hook.
 */
export interface UseTypewriterOptions {
  /**
   * The mode of the typewriter effect.
   * - If set to `'write'`, the hook will write the text.
   * - If set to `'erase'`, the hook will erase the text.
   * @default 'write'
   */
  mode?: Mode | undefined;

  /**
   * The delay between each character when writing (milliseconds).
   * @default 50
   */
  writeSpeed?: number | undefined;

  /**
   * The delay between each character when erasing (milliseconds).
   * @default 50
   */
  eraseSpeed?: number | undefined;

  /**
   * Delay before starting to write (milliseconds).
   * @default 0
   */
  writePreDelay?: number | undefined;

  /**
   * Delay before starting to erase (milliseconds).
   * @default 0
   */
  erasePreDelay?: number | undefined;

  /**
   * Delay after finishing to write (milliseconds).
   * @default 1500
   */
  writePostDelay?: number | undefined;

  /**
   * Delay after finishing to erase (milliseconds).
   * @default 1500
   */
  erasePostDelay?: number | undefined;

  /**
   * Whether to keep looping or not.
   * @default false
   */
  loop?: boolean | undefined;

  /**
   * Temporarily pauses writing/erasing when set to `true`.
   * @default false
   */
  pause?: boolean | undefined;

  /**
   * Callback function that is called when writing is complete.
   * @default undefined
   */
  onWriteComplete?: (() => void) | undefined;

  /**
   * Callback function that is called when erasing is complete.
   * @default undefined
   */
  onEraseComplete?: (() => void) | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Simple Typewriter Effect hook.
 *
 * @param text Text to type out.
 * @param options Options for the typewriter effect.
 * @returns A readonly tuple containing the current text.
 *
 * @example
 * ```tsx
 * import { useTypewriter, type UseTypewriterOptions } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [currentText] = useTypewriter('Hello, World!', {
 *     // Default Options
 *     mode: 'write',
 *     writeSpeed: 50,
 *     eraseSpeed: 50,
 *     writePreDelay: 0,
 *     erasePreDelay: 0,
 *     writePostDelay: 1500,
 *     erasePostDelay: 1500,
 *     loop: false,
 *     pause: false,
 *     onWriteComplete: undefined,
 *     onEraseComplete: undefined,
 *   });
 *
 *   return <span>{currentText}</span>;
 * }
 * ```
 */
export function useTypewriter(
  text: string,
  {
    mode = 'write',
    writeSpeed = 50,
    eraseSpeed = 50,
    writePreDelay = 0,
    erasePreDelay = 0,
    writePostDelay = 1_500,
    erasePostDelay = 1_500,
    loop = false,
    pause = false,
    onWriteComplete: onWriteCompleteProp = undefined,
    onEraseComplete: onEraseCompleteProp = undefined,
  }: UseTypewriterOptions = {},
): readonly [currentText: string] {
  const [currentText, setCurrentText] = useState<string>(mode === 'write' ? '' : text);
  const [currentMode, setCurrentMode] = useState<Mode>(mode);

  const onWriteComplete = useEffectEvent(() => {
    onWriteCompleteProp?.();
  });
  const onEraseComplete = useEffectEvent(() => {
    onEraseCompleteProp?.();
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (pause) {
      return undefined;
    }

    /** Minimal helper to emulate `setTimeout` with rAF(requestAnimationFrame) */
    const setTimeoutRaf = (callback: () => void, delay: number) => {
      const base = performance.now();

      const step = (timestamp: number) => {
        if (timestamp - base >= delay) {
          rafRef.current = null;
          callback();
          return;
        }

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    if (currentMode === 'write') {
      if (currentText.length === text.length) {
        setTimeoutRaf(() => {
          if (loop) {
            setCurrentMode('erase');
          }

          onWriteComplete();
        }, writePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(prev => prev + text[currentText.length]);
          },
          currentText.length === 0 ? writePreDelay : writeSpeed,
        );
      }
    } else if (currentMode === 'erase') {
      if (currentText.length === 0) {
        setTimeoutRaf(() => {
          if (loop) {
            setCurrentMode('write');
          }

          onEraseComplete();
        }, erasePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(prev => prev.slice(0, prev.length - 1));
          },
          currentText.length === text.length ? erasePreDelay : eraseSpeed,
        );
      }
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [
    text,
    writeSpeed,
    eraseSpeed,
    writePreDelay,
    erasePreDelay,
    writePostDelay,
    erasePostDelay,
    loop,
    pause,
    currentText,
    currentMode,
  ]);

  return [currentText] as const;
}
