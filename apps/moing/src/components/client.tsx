/**
 * @fileoverview client.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';

import styles from './client.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  interview: ReturnType<typeof useInterview<HTMLDivElement>>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Client({ interview }: Props) {
  const { section } = useScenarioContext();
  const { status } = section.client;
  const { contentRef } = interview;

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
