/**
 * @fileoverview app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useCountdown, useScroll, useSpeechRecognition } from '@lumir/react-kit/hooks';
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
  const { config, setConfig } = useConfigContext();
  const { contentRef, submit, getInterviewInfo } = useInterviewContext();
  const { section } = useScenarioContext();
  const timerQuestionIndexRef = useRef(0);
  const [currentCount, setCurrentCount] = useCountdown(0, {
    onComplete: () => submit(timerQuestionIndexRef.current),
  });
  const [scrollRef, scroll] = useScroll<HTMLDivElement>({ behavior: 'smooth' });
  const { listening, transcript, resetTranscript, toggleListening } =
    useSpeechRecognition({
      continuous: true,
      lang: 'ko-KR',
    });

  useLayoutEffect(() => {
    if (!transcript || !contentRef.current) return;

    contentRef.current.innerText += transcript;
    resetTranscript();
  }, [contentRef, transcript, resetTranscript]);

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
          if (section.config === 'interactive')
            setConfig(prev => ({ ...prev, visibility: !prev.visibility }));
        }}
      />
      <Button
        type="speech"
        icon={<CiMicrophoneOn size="40px" />}
        hoverEffect={listening}
        onClick={toggleListening}
      />
      <Button
        type="reload"
        icon={<GrPowerReset size="32px" />}
        onClick={() => window.location.reload()}
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
              timerQuestionIndexRef.current = getInterviewInfo().index;
              setCurrentCount(config.time * 60_000);
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
