/**
 * @fileoverview section-client.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';

import './section-client.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  interview: ReturnType<typeof useInterview>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SectionClient({ interview }: Props) {
  const { section } = useScenarioContext();
  const { status } = section['section-client'];
  const { contentRef } = interview;

  return (
    <NeonDiv
      className={cn(
        'section-client',
        'transition',
        'custom-scrollbar',
        'custom-main-section',
        'custom-main-section-bash',
        status === 'hidden' && 'custom-invisible-section',
      )}
      neonColor="black"
    >
      <div
        // @ts-expect-error -- TODO
        ref={contentRef}
        contentEditable="true"
        spellCheck="false"
        data-placeholder="$ Interviewee"
      />
    </NeonDiv>
  );
}
