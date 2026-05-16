/**
 * @fileoverview app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect } from 'react';
import { useCountdown, useScroll } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';

import Button from '@/components/button';
import MainButton from '@/components/main-button';
import SectionClient from '@/components/section-client';
import SectionConfig from '@/components/section-config';
import SectionServer from '@/components/section-server';
import Timer from '@/components/timer';
import Title from '@/components/title';
import {
  CiMicrophoneOn,
  GoGear,
  GrPowerReset,
  IoIosCheckmarkCircleOutline,
} from '@lumir/react-kit/svgs';

import useScenario from '@/hooks/use-scenario';
import useConfig from '@/hooks/use-config';
import useInterview from '@/hooks/use-interview';

import './app.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function App() {
  const scenario = useScenario();
  const config = useConfig();
  const interview = useInterview();
  const timer = useCountdown({
    durationMs: config.configState.time * 60 * 1_000,
    onComplete: interview.submit,
  });
  const [scrollRef, scroll] = useScroll<HTMLDivElement>({ behavior: 'smooth' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      scroll.intoView({ block: 'end', inline: 'nearest' });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [scenario.getSectionObj, scroll]);

  return (
    <>
      <Button
        type="header-l"
        icon={<GoGear size="35px" />}
        scenario={scenario}
        onClick={() => {
          config.handleConfigState({ visibility: !config.configState.visibility });
        }}
      />
      <Button
        type="header-r"
        icon={<CiMicrophoneOn size="40px" />}
        hoverEffect={interview.listening}
        scenario={scenario}
        onClick={() => {
          interview.toggleListening();
        }}
      />
      <Button
        type="footer-l"
        icon={<GrPowerReset size="32px" />}
        scenario={scenario}
        onClick={() => {
          window.location.reload();
        }}
      />
      <Button
        type="footer-r"
        icon={<IoIosCheckmarkCircleOutline size="39px" />}
        scenario={scenario}
        onClick={() => {
          interview.submit();
          timer[1].stop();
        }}
      />

      <Timer scenario={scenario} timer={timer} />

      <main className={cn('main', 'custom-flex-center', 'custom-scrollbar')}>
        <div ref={scrollRef}>
          <Title scenario={scenario} />
          <SectionServer
            scenario={scenario}
            config={config}
            interview={interview}
            timer={timer}
          />
          <SectionClient scenario={scenario} interview={interview} />
          <SectionConfig config={config} />
          <MainButton scenario={scenario} config={config} interview={interview} />
        </div>
      </main>
    </>
  );
}
