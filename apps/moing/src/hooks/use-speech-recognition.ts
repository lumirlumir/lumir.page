/**
 * @fileoverview use-speech-recognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 * @see https://github.com/mdn/dom-examples/blob/main/web-speech-api/speech-color-changer/script.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * The `SpeechRecognition` interface of the Web Speech API
 * is the controller interface for the recognition service.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 */
interface SpeechRecognition extends EventTarget {
  /**
   * Returns and sets the language of the current `SpeechRecognition`.
   * If not specified, this defaults to the HTML `lang` attribute value,
   * or the user agent's language setting if that isn't set either.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang
   */
  lang: string;

  /**
   * Controls whether continuous results are returned for each recognition, or only a single result.
   * Defaults to single. (`false`).
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   * @default false
   */
  continuous: boolean;

  /**
   * Controls whether interim results should be returned (`true`) or not (`false`).
   * Interim results are results that are not yet final (e.g., the `SpeechRecognitionResult.isFinal` property is `false`.)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
   * @default false
   */
  interimResults: boolean;

  /**
   * Sets the maximum number of `SpeechRecognitionAlternatives` provided per result. The default value is `1`.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/maxAlternatives
   * @default 1
   */
  maxAlternatives: number;

  /**
   * Stops the speech recognition service from listening to incoming audio,
   * and doesn't attempt to return a `SpeechRecognitionResult`.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/abort
   */
  abort(): () => void;

  /**
   * Starts the speech recognition service to listen for incoming audio (from a microphone or an audio track)
   * and returns the results of that recognition.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start
   */
  start(): () => void;

  /**
   * Stops the speech recognition service from listening for incoming audio
   * and attempts to return a `SpeechRecognitionResult` based on the results captured so far.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/stop
   */
  stop(): () => void;

  onend: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: Event /* TODO */) => void) | null;
  onstart: ((event: Event /* TODO */) => void) | null;
}

declare global {
  interface Window {
    /**
     * Creates a new `SpeechRecognition` object.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition
     */
    SpeechRecognition?: new () => SpeechRecognition;

    /**
     * Creates a new `SpeechRecognition` object.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition
     */
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/*

const isAndroid = /(android)/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : '',
);

const browserSupportsContinuousListening = isSpeechRecognitionSupported() && !isAndroid;

*/

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // eslint-disable-next-line no-console -- Needed for user awareness.
      console.warn(
        'Web Speech API (`SpeechRecognition` or `webkitSpeechRecognition`) is not supported in this browser.',
      );
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = event => {
      // @ts-expect-error -- TODO
      const text = event.results[event.results.length - 1][0].transcript;

      setTranscript(prev => `${prev} ${text}`);
    };
    recognition.onerror = err => {
      // eslint-disable-next-line no-console -- Needed for user awareness.
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  const resetTranscript = () => {
    setTranscript('');
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  return {
    transcript,
    listening: isListening,
    resetTranscript,
    toggleListening,
  };
}
