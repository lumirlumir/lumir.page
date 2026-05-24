/**
 * @fileoverview neon-div.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type HTMLAttributes, type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import './neon-div.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * Neon color for the component.
   * @default 'red'
   */
  neonColor?: keyof typeof colorMap;

  /**
   * Neon size for the component.
   * @default 'l'
   */
  neonSize?: keyof typeof sizeMap;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Color map for neon effect.
 */
const colorMap = {
  red: '#ff1177',
  brightOrange: '#f8b734',
  orange: '#ff9900',
  banana: '#f5e3a7',
  yellow: '#ffdd1b',
  green: '#a2ff37',
  sky: '#b7e7f7',
  blue: '#3b8de4',
  violet: '#e785d2',
  purple: '#ad0096',
  silver: '#c4c4c6',
  white: '#bbbbbb',
  black: '#0e0e0e',
} as const;

/**
 * Size map for neon effect.
 */
const sizeMap = {
  xl: 2,
  l: 1.5,
  m: 1,
  s: 0.75,
  xs: 0.5,
} as const;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Component `NeonDiv`.
 * @example
 * // Default Values
 * <NeonDiv neonColor="red" neonSize="l">
 *   {undefined}
 * </NeonDiv>
 */
export default function NeonDiv({
  neonColor = 'red',
  neonSize = 'l',
  children,
  className,
  style,
  ...props
}: PropsWithChildren<Props> = {}) {
  return (
    <div
      className={cn('neon-div', className)}
      style={{
        ['--neon-color' as string]: colorMap[neonColor],
        ['--neon-size' as string]: sizeMap[neonSize],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
