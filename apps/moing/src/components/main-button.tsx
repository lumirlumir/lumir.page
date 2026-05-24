/**
 * @fileoverview main-button.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MouseEventHandler } from 'react';
import { cn } from '@lumir/utils';

import NeonButton from '@/components/neon-button';
import NeonFont from '@/components/neon-font';
import { useConfigContext } from '@/contexts/config-context';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';

import './main-button.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  interview: ReturnType<typeof useInterview>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function ButtonMain({ interview }: Props) {
  const { configState, updateConfig, isConfigDone } = useConfigContext();
  const scenario = useScenarioContext();
  const { getSectionObj, toNextSection, toLastSection, isLastSection } = scenario;
  const { content, visibility } = getSectionObj()['main-button'];
  const { initInterview } = interview;

  const onClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (content === 'PRESS') {
      toNextSection();
    }
    if (content === 'START') {
      if (e.ctrlKey) {
        toLastSection();
        return;
      }
      if (isConfigDone()) {
        updateConfig({ visibility: false });
        initInterview(configState);
      }
      toNextSection();
    }
  };

  return (
    <div
      className={cn(
        'main-button',
        'custom-flex-center',
        'custom-main-others',
        'transition',
        (isLastSection() && isConfigDone()) || visibility
          ? ''
          : 'pointer-events-none opacity-0',
      )}
    >
      <NeonButton style={{ padding: '20px 30px' }} onClick={onClick}>
        <NeonFont
          neonColor="white"
          neonSize="s"
          style={{ fontFamily: 'Audiowide', fontSize: '40px' }}
        >
          {content}
        </NeonFont>
      </NeonButton>
    </div>
  );
}
