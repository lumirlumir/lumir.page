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
import useScenario from '@/hooks/use-scenario';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  type: 'header-l' | 'header-r' | 'footer-l' | 'footer-r';
  icon: React.ReactElement;
  scenario: ReturnType<typeof useScenario>;
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

export default function Button({
  type,
  icon,
  scenario,
  onClick,
  hoverEffect = false,
}: Props) {
  const { visibility, clickability } = scenario.getSectionObj()[type];

  return (
    <div
      className={cn(
        'button',
        'custom-flex-center',
        'transition',
        type,
        visibility || 'pointer-events-none opacity-0',
        clickability || 'pointer-events-none',
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
