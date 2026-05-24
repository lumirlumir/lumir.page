/**
 * @fileoverview app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect } from 'react';
import { useScroll } from '@lumir/react-kit/hooks';
import {
  CiMicrophoneOn,
  GoGear,
  GrPowerReset,
  IoIosCheckmarkCircleOutline,
} from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';

import Button from '@/components/button';
import Client from '@/components/client';
import MainButton from '@/components/main-button';
import SectionConfig from '@/components/section-config';
import SectionServer from '@/components/section-server';
import Timer from '@/components/timer';
import Title from '@/components/title';
import { useConfigContext } from '@/contexts/config-context';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';
import useTimer from '@/hooks/use-timer';

import './app.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function App() {
  const { configState, updateConfig } = useConfigContext();
  const { section } = useScenarioContext();
  const interview = useInterview();
  const timer = useTimer(interview.submit);
  const [scrollRef, scroll] = useScroll<HTMLDivElement>({ behavior: 'smooth' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      scroll.intoView({ block: 'end', inline: 'nearest' });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [section, scroll]);

  return (
    <>
      <Button
        type="header-l"
        icon={<GoGear size="35px" />}
        onClick={() => {
          updateConfig({ visibility: !configState.visibility });
        }}
      />
      <Button
        type="header-r"
        icon={<CiMicrophoneOn size="40px" />}
        hoverEffect={interview.listening}
        onClick={() => {
          interview.toggleListening();
        }}
      />
      <Button
        type="footer-l"
        icon={<GrPowerReset size="32px" />}
        onClick={() => {
          window.location.reload();
        }}
      />
      <Button
        type="footer-r"
        icon={<IoIosCheckmarkCircleOutline size="39px" />}
        onClick={() => {
          interview.submit();
          timer.stopTimer();
        }}
      />

      <Timer timer={timer} />

      <main className={cn('main', 'custom-flex-center', 'custom-scrollbar')}>
        <div ref={scrollRef}>
          <Title />
          <SectionServer interview={interview} timer={timer} />
          <Client interview={interview} />
          <SectionConfig />
          <MainButton interview={interview} />
        </div>
      </main>
    </>
  );
}
