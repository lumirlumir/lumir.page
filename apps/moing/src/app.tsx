/**
 * @fileoverview app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect } from 'react';
import { useCountdown, useScroll } from '@lumir/react-kit/hooks';
import {
  CiMicrophoneOn,
  GoGear,
  GrPowerReset,
  IoIosCheckmarkCircleOutline,
} from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';

import Button from '@/components/button';
import Client from '@/components/client';
import Config from '@/components/config';
import MainButton from '@/components/main-button';
import Server from '@/components/server';
import Timer from '@/components/timer';
import Title from '@/components/title';
import { useConfigContext } from '@/contexts/config-context';
import { useScenarioContext } from '@/contexts/scenario-context';
import useInterview from '@/hooks/use-interview';

import './app.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function App() {
  const { config, updateConfig } = useConfigContext();
  const { section } = useScenarioContext();
  const interview = useInterview<HTMLDivElement>();
  const [remainingMs, countdown] = useCountdown({
    durationMs: config.time * 60 * 1_000,
    onComplete: interview.submit,
  });
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
        type="config"
        icon={<GoGear size="35px" />}
        onClick={() => {
          updateConfig({ visibility: !config.visibility });
        }}
      />
      <Button
        type="speech"
        icon={<CiMicrophoneOn size="40px" />}
        hoverEffect={interview.listening}
        onClick={() => {
          interview.toggleListening();
        }}
      />
      <Button
        type="reload"
        icon={<GrPowerReset size="32px" />}
        onClick={() => {
          window.location.reload();
        }}
      />
      <Button
        type="submit"
        icon={<IoIosCheckmarkCircleOutline size="39px" />}
        onClick={() => {
          interview.submit();
          countdown.stop();
        }}
      />

      <Timer remainingMs={remainingMs} />

      <main className={cn('custom-flex-center', 'custom-scrollbar')}>
        <div ref={scrollRef}>
          <Title />
          <Server
            interview={interview}
            onTestComplete={() => {
              countdown.reset(config.time * 60 * 1_000);
              countdown.start();
            }}
          />
          <Client interview={interview} />
          <Config />
          <MainButton interview={interview} />
        </div>
      </main>
    </>
  );
}
