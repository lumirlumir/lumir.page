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
  const prevContent = useRef<string>('');
  const {
    listening,
    transcript,
    resetTranscript,
    toggleListening: toggle,
  } = useSpeechRecognition({ continuous: true, lang: 'ko-KR' });

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerText = prevContent.current + transcript;
  }, [transcript]);

  const toggleListening = () => {
    if (!listening && contentRef.current)
      prevContent.current = contentRef.current.innerText;
    toggle();
    if (!listening) resetTranscript();
  };

  return {
    contentRef,
    listening,
    toggleListening,
  };
}
