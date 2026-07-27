/**
 * @fileoverview client.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import { useInterviewContext } from '@/contexts/interview-context';
import { useScenarioContext } from '@/contexts/scenario-context';

import styles from './client.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Client() {
  const { contentRef } = useInterviewContext();
  const { section } = useScenarioContext();
  const { status } = section.client;

  return (
    <NeonDiv
      className={cn(
        styles.client,
        'transition',
        'custom-scrollbar',
        'custom-main-section',
        'custom-main-section-bash',
        status === 'hidden' && 'custom-invisible-section',
      )}
      neonColor="black"
    >
      <div
        ref={contentRef}
        contentEditable="true"
        spellCheck="false"
        data-placeholder="$ Interviewee"
      />
    </NeonDiv>
  );
}
