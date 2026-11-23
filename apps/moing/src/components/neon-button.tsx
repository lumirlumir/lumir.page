/**
 * @fileoverview neon-button.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import React from 'react';
import { cn } from '@lumir/utils';
import styles from './neon-button.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether to apply a hover effect.
   * @default false
   */
  hoverEffect?: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Component `NeonButton`.
 * @example
 * // Default Values
 * <NeonButton hoverEffect={false}>
 *   {undefined}
 * </NeonButton>
 */
export default function NeonButton({
  hoverEffect = false,
  children,
  ...props
}: React.PropsWithChildren<Props> = {}) {
  return (
    <div className={cn(styles['neon-button'], hoverEffect && styles.hover)}>
      <span />
      <span />
      <span />
      <span />
      <button type="button" {...props}>
        {children}
      </button>
    </div>
  );
}
