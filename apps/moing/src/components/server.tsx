/**
 * @fileoverview server.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useLayoutEffect, useMemo } from 'react';
import { Typewriter } from '@lumir/react-kit/components';
import { useCountdown, useScroll } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import { useConfigContext } from '@/contexts/config-context';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';
import useHistoryState from '@/hooks/use-history-state';

import './server.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  interview: ReturnType<typeof useInterview>;
  timer: ReturnType<typeof useCountdown>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Format content to be displayed in the server section.
 * @param content The content to be formatted.
 * @returns The formatted content.
 */
function formatContent(content: string) {
  if (content === '') {
    // If content is empty, return an empty string to avoid displaying `'> '` prefix
    return '';
  } else if (content.startsWith('$')) {
    // If content starts with '$', treat it as a command and display without `'> '` prefix
    return `${content}\n\n`;
  } else {
    return `> ${content}\n\n`;
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Server({ interview, timer }: Props) {
  const { config } = useConfigContext();
  const { section, toNextSection } = useScenarioContext();
  const { content, mode, status } = section.server;
  const { question, getInterviewInfo, isInterviewDone, getInterviewHistory } = interview;
  const [, countdown] = timer;
  const [scrollRef, scroll] = useScroll<HTMLDivElement>({ behavior: 'smooth' });
  const { historyState, addHistory } = useHistoryState<string>();

  const text = useMemo(() => {
    if (mode === 'test') {
      return question === null
        ? ''
        : formatContent(
            `${getInterviewInfo().questionType.toUpperCase()}분야 ${getInterviewInfo().questionMain}-${getInterviewInfo().questionSub}번 문제입니다. ${question}`,
          );
    } else if (mode === 'result') {
      return getInterviewHistory();
    } else {
      return formatContent(content);
    }
  }, [mode, content, question, getInterviewInfo, getInterviewHistory]);

  useLayoutEffect(() => {
    addHistory(text);
  }, [text, addHistory]);

  useEffect(() => {
    if (mode === 'test' && isInterviewDone()) toNextSection();
  }, [question, isInterviewDone, toNextSection, mode]);

  return (
    <NeonDiv
      className={cn(
        'server',
        'custom-scrollbar',
        'custom-main-section',
        'custom-main-section-bash',
        'transition',
        status !== 'hidden' && !config.visibility ? '' : 'custom-invisible-section',
        mode === 'result' && 'wide',
      )}
      neonColor="black"
    >
      <div>{historyState.slice(0, -1)}</div>
      <div>
        <Typewriter
          key={text}
          text={text}
          cursor="_"
          writeSpeed={mode === 'result' ? 1 : 25} // original: 30
          writePreDelay={2000}
          writePostDelay={1000}
          onWriteComplete={() => {
            if (mode === 'auto' || mode === 'result') toNextSection();
            if (mode === 'test' && text !== '') {
              countdown.reset(config.time * 60 * 1_000);
              countdown.start();
            }
            scroll.intoView({ block: 'end', inline: 'nearest' });
          }}
        />
      </div>
      <div className="ref" ref={scrollRef} />
    </NeonDiv>
  );
}
