/**
 * @fileoverview use-speech-recognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 * @see https://github.com/mdn/dom-examples/blob/main/web-speech-api/speech-color-changer/script.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from 'react';

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
 * Represents an event handler assigned to a `SpeechRecognition` event handler property.
 * @typeParam K The event name used to select its event object type from `SpeechRecognitionEventMap`.
 */
type SpeechRecognitionEventHandler<K extends keyof SpeechRecognitionEventMap> =
  ((this: SpeechRecognition, event: SpeechRecognitionEventMap[K]) => void) | null;

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
  onaudioend: SpeechRecognitionEventHandler<'audioend'>;

  /**
   * Handles the `audiostart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/audiostart_event
   */
  onaudiostart: SpeechRecognitionEventHandler<'audiostart'>;

  /**
   * Handles the `end` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event
   */
  onend: SpeechRecognitionEventHandler<'end'>;

  /**
   * Handles the `error` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/error_event
   */
  onerror: SpeechRecognitionEventHandler<'error'>;

  /**
   * Handles the `nomatch` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/nomatch_event
   */
  onnomatch: SpeechRecognitionEventHandler<'nomatch'>;

  /**
   * Handles the `result` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event
   */
  onresult: SpeechRecognitionEventHandler<'result'>;

  /**
   * Handles the `soundend` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundend_event
   */
  onsoundend: SpeechRecognitionEventHandler<'soundend'>;

  /**
   * Handles the `soundstart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/soundstart_event
   */
  onsoundstart: SpeechRecognitionEventHandler<'soundstart'>;

  /**
   * Handles the `speechend` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechend_event
   */
  onspeechend: SpeechRecognitionEventHandler<'speechend'>;

  /**
   * Handles the `speechstart` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/speechstart_event
   */
  onspeechstart: SpeechRecognitionEventHandler<'speechstart'>;

  /**
   * Handles the `start` event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start_event
   */
  onstart: SpeechRecognitionEventHandler<'start'>;

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

/**
 * Options for the `useSpeechRecognition` hook.
 */
export type UseSpeechRecognitionOptions = Partial<
  Pick<SpeechRecognition, 'continuous' | 'interimResults' | 'lang' | 'maxAlternatives'>
>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function useSpeechRecognition({
  continuous,
  interimResults,
  lang,
  maxAlternatives,
}: UseSpeechRecognitionOptions = {}) {
  const [listening, setListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // eslint-disable-next-line no-console -- Needed for user awareness.
      console.warn(
        'Web Speech API (`SpeechRecognition` or `webkitSpeechRecognition`) is not supported in this browser.',
      );

      return undefined;
    }

    const speechRecognition = new SpeechRecognition();

    if (continuous !== undefined) {
      speechRecognition.continuous = continuous;
    }
    if (interimResults !== undefined) {
      speechRecognition.interimResults = interimResults;
    }
    if (lang !== undefined) {
      speechRecognition.lang = lang;
    }
    if (maxAlternatives !== undefined) {
      speechRecognition.maxAlternatives = maxAlternatives;
    }

    speechRecognition.onstart = () => setListening(true);
    speechRecognition.onend = () => setListening(false);
    speechRecognition.onresult = event => {
      const text = event.results[event.results.length - 1][0].transcript;

      setTranscript(prev => `${prev} ${text}`);
    };
    speechRecognition.onerror = err => {
      // eslint-disable-next-line no-console -- Needed for user awareness.
      console.error('Speech recognition error:', err);

      setListening(false);
    };

    speechRecognitionRef.current = speechRecognition;

    return () => {
      speechRecognition.onstart = null;
      speechRecognition.onend = null;
      speechRecognition.onresult = null;
      speechRecognition.onerror = null;
      speechRecognitionRef.current?.stop();
      speechRecognitionRef.current = null;
    };
  }, [continuous, interimResults, lang, maxAlternatives]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const toggleListening = useCallback(() => {
    if (!speechRecognitionRef.current) {
      return;
    }

    if (listening) {
      speechRecognitionRef.current?.stop();
    } else {
      speechRecognitionRef.current?.start();
    }
  }, [listening]);

  return {
    listening,
    transcript,
    resetTranscript,
    toggleListening,
  };
}
