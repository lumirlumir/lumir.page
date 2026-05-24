/**
 * @fileoverview neon-font.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type HTMLAttributes, type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import './neon-font.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props extends HTMLAttributes<HTMLSpanElement> {
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
  red: ['#fff', '#ff1177'],
  brightOrange: ['#fff', '#f8b734'],
  orange: ['#fff', '#ff9900'],
  banana: ['#fff', '#fceaac'],
  yellow: ['#fff', '#ffdd1b'],
  green: ['#fff', '#b6ff00'],
  sky: ['#fff', '#b7e7f7'],
  blue: ['#fff', '#2080e7'],
  violet: ['#fff', '#e555c7'],
  purple: ['#fff', '#ad0096'],
  silver: ['#fff', '#c4c4c6'],
  white: ['#eeeeee', '#bbbbbb'],
  black: ['#eeeeee', '#0e0e0e'],
} as const;

/**
 * Size map for neon effect.
 */
const sizeMap = {
  xl: 1.5,
  l: 1,
  m: 0.5,
  s: 0.2,
  xs: 0.03,
} as const;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Component `NeonFont`.
 * @example
 * // Default Values
 * <NeonFont neonColor="red" neonSize='l'>
 *   {undefined}
 * </NeonFont>
 */
export default function NeonFont({
  neonColor = 'red',
  neonSize = 'l',
  children,
  className,
  style,
  ...props
}: PropsWithChildren<Props> = {}) {
  return (
    <span
      className={cn('neon-font', className)}
      style={{
        ['--neon-color-start' as string]: colorMap[neonColor][0],
        ['--neon-color-end' as string]: colorMap[neonColor][1],
        ['--neon-size' as string]: sizeMap[neonSize],
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
