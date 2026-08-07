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

import Button from '@/components/button';
import Client from '@/components/client';
import Config from '@/components/config';
import MainButton from '@/components/main-button';
import Server from '@/components/server';
import Timer from '@/components/timer';
import Title from '@/components/title';
import { useConfigContext } from '@/contexts/config';
import { useInterviewContext } from '@/contexts/interview';
import { useScenarioContext } from '@/contexts/scenario';

import './app.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function App() {
  const { config, updateConfig } = useConfigContext();
  const { listening, submit, toggleListening } = useInterviewContext();
  const { section } = useScenarioContext();
  const initialCount = config.time * 60 * 1_000;
  const [currentCount, setCurrentCount] = useCountdown(initialCount, {
    onComplete: submit,
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
        hoverEffect={listening}
        onClick={() => {
          toggleListening();
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
          submit();
          setCurrentCount(0);
        }}
      />

      <Timer className="timer" currentCount={currentCount} />

      <main className="custom-scrollbar">
        <div ref={scrollRef}>
          <Title />
          <Server
            onTestWriteComplete={() => {
              setCurrentCount(initialCount);
            }}
          />
          <Client />
          <Config />
          <MainButton />
        </div>
      </main>
    </>
  );
}
