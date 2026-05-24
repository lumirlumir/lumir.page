/**
 * @fileoverview Typewriter component.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type HTMLAttributes } from 'react';
import { useTypewriter, type UseTypewriterOptions } from '../hooks/use-typewriter.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `Typewriter` component.
 */
export interface TypewriterProps
  extends HTMLAttributes<HTMLSpanElement>, UseTypewriterOptions {
  /**
   * The value to use as the cursor. Set to `null` to disable.
   * @default '|'
   */
  cursor?: string | null;

  /**
   * The class name to apply to the cursor element.
   * @default 'cursor'
   */
  cursorClassName?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Simple Typewriter Effect component.
 *
 * TIP:
 * - Use `cursorClassName` to style the cursor (e.g., blinking effect).
 * - Use `style={{ whiteSpace: 'pre' }}` to support multiline text.
 *
 * @example
 * ```tsx
 * import { Typewriter, type TypewriterProps } from '@lumir/react-kit/components';
 *
 * // Default Values
 * <Typewriter
 *   cursor="|"
 *   cursorClassName="cursor"
 *   text="Hello, World!"
 *   mode="write"
 *   writeSpeed={50}
 *   eraseSpeed={50}
 *   writePreDelay={0}
 *   erasePreDelay={0}
 *   writePostDelay={1500}
 *   erasePostDelay={1500}
 *   loop={false}
 *   pause={false}
 *   onWriteComplete={undefined}
 *   onEraseComplete={undefined}
 * />
 * ```
 */
export function Typewriter({
  // `Typewriter`
  cursor = '|',
  cursorClassName = 'cursor',
  // `useTypewriter`
  text,
  mode,
  writeSpeed,
  eraseSpeed,
  writePreDelay,
  erasePreDelay,
  writePostDelay,
  erasePostDelay,
  loop,
  pause,
  onWriteComplete,
  onEraseComplete,
  // `HTMLAttributes<HTMLSpanElement>`
  ...props
}: TypewriterProps) {
  const [currentText] = useTypewriter({
    text,
    mode,
    writeSpeed,
    eraseSpeed,
    writePreDelay,
    erasePreDelay,
    writePostDelay,
    erasePostDelay,
    loop,
    pause,
    onWriteComplete,
    onEraseComplete,
  });

  return (
    <span {...props}>
      {currentText}
      <span className={cursorClassName} aria-hidden="true">
        {cursor}
      </span>
    </span>
  );
}
