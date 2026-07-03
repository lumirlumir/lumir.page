/**
 * @fileoverview use-interview-content
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef } from 'react';
import useSpeechRecognition from '@/hooks/use-speech-recognition';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewContent<T extends HTMLElement>() {
  const contentRef = useRef<T | null>(null);
  const prevContent = useRef<string>('');
  const {
    transcript,
    listening,
    resetTranscript,
    toggleListening: toggle,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening && contentRef.current)
      contentRef.current.innerHTML = `${prevContent.current}${transcript}`;
  }, [transcript, listening]);

  const toggleListening = () => {
    if (!listening && contentRef.current)
      prevContent.current = contentRef.current.innerHTML;
    toggle();
    if (!listening) resetTranscript();
  };

  return {
    contentRef,
    listening,
    toggleListening,
  };
}
