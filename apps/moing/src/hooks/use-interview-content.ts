/**
 * @fileoverview use-interview-content
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef } from 'react';
import { useSpeechRecognition } from '@lumir/react-kit/hooks';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewContent<T extends HTMLElement>() {
  const contentRef = useRef<T | null>(null);
  const prevContentRef = useRef<string>('');
  const {
    listening,
    transcript,
    resetTranscript,
    toggleListening: toggle,
  } = useSpeechRecognition({ continuous: true, lang: 'ko-KR' });

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerText = prevContentRef.current + transcript;
  }, [transcript]);

  const toggleListening = () => {
    if (!listening && contentRef.current)
      prevContentRef.current = contentRef.current.innerText;
    toggle();
    if (!listening) resetTranscript();
  };

  return {
    contentRef,
    listening,
    toggleListening,
  };
}
