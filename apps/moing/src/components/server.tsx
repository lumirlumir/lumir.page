/**
 * @fileoverview server.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useMemo } from 'react';
import { Typewriter } from '@lumir/react-kit/components';
import { useHistory, useScroll } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import { useConfigContext } from '@/contexts/config-context';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';
import useTimer from '@/hooks/use-timer';

import styles from './server.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  interview: ReturnType<typeof useInterview>;
  timer: ReturnType<typeof useTimer>;
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
  const { resetTimer } = timer;
  const [scrollRef, scroll] = useScroll<HTMLDivElement>({ behavior: 'smooth' });
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
  const history = useHistory<string>(text);

  useEffect(() => {
    if (mode === 'test' && isInterviewDone()) toNextSection();
  }, [mode, question, isInterviewDone, toNextSection]);

  return (
    <NeonDiv
      className={cn(
        styles.server,
        'custom-scrollbar',
        'custom-main-section',
        'custom-main-section-bash',
        'transition',
        status !== 'hidden' && !config.visibility ? '' : 'custom-invisible-section',
        mode === 'result' && styles.wide,
      )}
      neonColor="black"
    >
      <div>{history}</div>
      <div>
        <Typewriter
          key={text}
          text={text}
          cursor="_"
          cursorClassName={styles.cursor}
          writeSpeed={mode === 'result' ? 1 : 25} // original: 30
          writePreDelay={2000}
          writePostDelay={1000}
          onWriteComplete={() => {
            if (mode === 'auto' || mode === 'result') toNextSection();
            if (mode === 'test' && text !== '') resetTimer(config.time);
            scroll.intoView({ block: 'end', inline: 'nearest' });
          }}
        />
      </div>
      <div className={styles.ref} ref={scrollRef} />
    </NeonDiv>
  );
}
