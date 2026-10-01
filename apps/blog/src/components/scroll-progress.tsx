/**
 * @fileoverview scroll-progress.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef, type HTMLAttributes } from 'react';
import { useScrollProgress } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';
import styles from './scroll-progress.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `ScrollProgress` component.
 */
export type ScrollProgressProps = HTMLAttributes<HTMLDivElement>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders a fixed progress bar that reflects the current document scroll position.
 */
export function ScrollProgress({ className, ...props }: ScrollProgressProps) {
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);

  useScrollProgress(progress => {
    scrollProgressRef.current?.style.setProperty('--scroll-progress', String(progress));
  });

  return (
    <div className={cn(styles['scroll-progress'], className)} {...props}>
      <div ref={scrollProgressRef} className={styles['scroll-progress-bar']} />
    </div>
  );
}
