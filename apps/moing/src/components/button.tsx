/**
 * @fileoverview button.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import React from 'react';
import { cn } from '@lumir/utils';

import NeonButton from '@/components/neon-button';
import NeonFont from '@/components/neon-font';
import { useScenarioContext } from '@/contexts/scenario-context';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  type: 'header-l' | 'header-r' | 'footer-l' | 'footer-r';
  icon: React.ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Whether to apply a hover effect.
   * @default false
   */
  hoverEffect?: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Button({ type, icon, onClick, hoverEffect = false }: Props) {
  const { section } = useScenarioContext();
  const { status } = section[type];

  return (
    <div
      className={cn(
        'button',
        'custom-flex-center',
        'transition',
        type,
        status === 'hidden' && 'pointer-events-none opacity-0',
        status === 'visible' && 'pointer-events-none',
      )}
    >
      <NeonButton
        hoverEffect={hoverEffect}
        style={{ width: '60px', height: '60px' }}
        onClick={onClick}
      >
        <NeonFont neonColor="white">{icon}</NeonFont>
      </NeonButton>
    </div>
  );
}
