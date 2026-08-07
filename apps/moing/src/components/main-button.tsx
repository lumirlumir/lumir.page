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
import { useInterviewContext } from '@/contexts/interview-context';
import { useScenarioContext } from '@/contexts/scenario-context';

import styles from './main-button.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function ButtonMain() {
  const { config, updateConfig, isConfigDone } = useConfigContext();
  const { initInterview } = useInterviewContext();
  const { section, toNextSection, toLastSection, isLastSection } = useScenarioContext();
  const { content, status } = section['main-button'];

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
        initInterview(config);
      }
      toNextSection();
    }
  };

  return (
    <div
      className={cn(
        styles['main-button'],
        'custom-main-others',
        (isLastSection() && isConfigDone()) || status !== 'hidden'
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
