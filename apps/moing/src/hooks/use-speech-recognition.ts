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
 * Maps the events emitted by `SpeechRecognition` to their event object types.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#events
 */
interface SpeechRecognitionEventMap {
  /**
   * Fired after the user agent finishes capturing audio.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audioend_event
   */
  audioend: Event;

  /**
   * Fired after the user agent starts capturing audio.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audiostart_event
   */
  audiostart: Event;

  /**
   * Fired when the speech recognition service disconnects.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event
   */
  end: Event;

  /**
   * Fired when a speech recognition error occurs.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/error_event
   */
  error: SpeechRecognitionErrorEvent;

  /**
   * Fired when a final result does not contain a sufficiently confident match.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/nomatch_event
   */
  nomatch: SpeechRecognitionEvent;

  /**
   * Fired when the speech recognition service returns a recognized word or phrase.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event
   */
  result: SpeechRecognitionEvent;

  /**
   * Fired when the user agent stops detecting sound.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundend_event
   */
  soundend: Event;

  /**
   * Fired when the user agent starts detecting sound.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundstart_event
   */
  soundstart: Event;

  /**
   * Fired when the speech recognition service stops detecting speech.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechend_event
   */
  speechend: Event;

  /**
   * Fired when the speech recognition service starts detecting speech.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechstart_event
   */
  speechstart: Event;

  /**
   * Fired when the speech recognition service begins listening for audio.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start_event
   */
  start: Event;
}

/**
 * The `SpeechRecognition` interface of the Web Speech API
 * is the controller interface for the recognition service.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 */
interface SpeechRecognition extends EventTarget {
  /**
   * Controls whether continuous results are returned for each recognition, or only a single result.
   * Defaults to single. (`false`).
   * - `true` means continuous.
   * - `false` means not continuous. (single result each time.)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   * @default false
   */
  continuous: boolean;

  // TODO: 여기부터

  /**
   * Controls whether interim results should be returned (`true`) or not (`false`).
   * Interim results are results that are not yet final (e.g., the `SpeechRecognitionResult.isFinal` property is `false`.)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
   * @default false
   */
  interimResults: boolean;

  /**
   * Returns and sets the language of the current `SpeechRecognition`.
   * If not specified, this defaults to the HTML `lang` attribute value,
   * or the user agent's language setting if that isn't set either.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang
   */
  lang: string;

  /**
   * Sets the maximum number of `SpeechRecognitionAlternative` objects provided per result.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/maxAlternatives
   * @default 1
   */
  maxAlternatives: number;

  /**
   * Stops the speech recognition service from listening to incoming audio,
   * and doesn't attempt to return a `SpeechRecognitionResult`.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/abort
   */
  abort(): void;

  /**
   * Starts the speech recognition service to listen for incoming audio (from a microphone or an audio track)
   * and returns the results of that recognition.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start
   */
  start(audioTrack?: MediaStreamTrack): void;

  /**
   * Stops the speech recognition service from listening for incoming audio
   * and attempts to return a `SpeechRecognitionResult` based on the results captured so far.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/stop
   */
  stop(): void;

  /**
   * Handles the `audioend` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audioend_event
   */
  onaudioend: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `audiostart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audiostart_event
   */
  onaudiostart: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `end` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event
   */
  onend: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `error` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/error_event
   */
  onerror: ((this: SpeechRecognition, event: SpeechRecognitionErrorEvent) => void) | null;

  /**
   * Handles the `nomatch` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/nomatch_event
   */
  onnomatch: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;

  /**
   * Handles the `result` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event
   */
  onresult: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;

  /**
   * Handles the `soundend` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundend_event
   */
  onsoundend: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `soundstart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundstart_event
   */
  onsoundstart: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `speechend` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechend_event
   */
  onspeechend: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `speechstart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechstart_event
   */
  onspeechstart: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Handles the `start` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start_event
   */
  onstart: ((this: SpeechRecognition, event: Event) => void) | null;

  /**
   * Registers a listener for a typed `SpeechRecognition` event.
   * @param type The event name.
   * @param listener The function invoked when the event is emitted.
   * @param options Options controlling how the listener is registered.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  addEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener: (this: SpeechRecognition, event: SpeechRecognitionEventMap[K]) => void,
    options?: Parameters<EventTarget['addEventListener']>[2],
  ): void;

  /**
   * Registers a listener using the standard `EventTarget` arguments.
   * @param args The arguments accepted by `EventTarget.addEventListener()`.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  addEventListener(...args: Parameters<EventTarget['addEventListener']>): void;

  /**
   * Removes a listener for a typed `SpeechRecognition` event.
   * @param type The event name.
   * @param listener The listener previously registered for the event.
   * @param options Options identifying the listener to remove.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
   */
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener: (this: SpeechRecognition, event: SpeechRecognitionEventMap[K]) => void,
    options?: Parameters<EventTarget['removeEventListener']>[2],
  ): void;

  /**
   * Removes a listener using the standard `EventTarget` arguments.
   * @param args The arguments accepted by `EventTarget.removeEventListener()`.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
   */
  removeEventListener(...args: Parameters<EventTarget['removeEventListener']>): void;
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
