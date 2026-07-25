/**
 * @fileoverview Type test for `use-speech-recognition.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  useSpeechRecognition,
  type UseSpeechRecognitionOptions,
} from './use-speech-recognition.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseSpeechRecognitionOptions

let options: UseSpeechRecognitionOptions;

options = {};
options = { continuous: false };
options = { continuous: true };
options = { lang: 'en-US' };
options = { continuous: true, lang: 'ko-KR' };

// @ts-expect-error - `continuous` should be a boolean.
options = { continuous: 'true' };
// @ts-expect-error - `lang` should be a string.
options = { lang: true };
// @ts-expect-error - Interim results are not exposed by the hook.
options = { interimResults: true };
// @ts-expect-error - Recognition alternatives are not exposed by the hook.
options = { maxAlternatives: 2 };
// @ts-expect-error - `unknown` is not a valid property of `UseSpeechRecognitionOptions`.
options = { unknown: 'unknown' };

// #endregion UseSpeechRecognitionOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useSpeechRecognition

({}) as typeof useSpeechRecognition satisfies Function;
({}) as Parameters<typeof useSpeechRecognition>[0] satisfies
  UseSpeechRecognitionOptions | undefined;
({}) as ReturnType<typeof useSpeechRecognition> satisfies {
  isSupported: boolean;
  listening: boolean;
  transcript: string;
  error: SpeechRecognitionErrorEvent | null;
  resetTranscript: () => void;
  toggleListening: () => void;
};

// @ts-expect-error - `useSpeechRecognition` should be a function.
({}) as typeof useSpeechRecognition satisfies boolean;
// @ts-expect-error - `useSpeechRecognition` should be a function.
({}) as typeof useSpeechRecognition satisfies string;

function useSpeechRecognitionTypeTest() {
  useSpeechRecognition();
  useSpeechRecognition(undefined);
  useSpeechRecognition({});
  useSpeechRecognition({ continuous: false });
  useSpeechRecognition({ continuous: true });
  useSpeechRecognition({ lang: 'en-US' });
  useSpeechRecognition({ continuous: true, lang: 'ko-KR' });

  const { isSupported, listening, transcript, error, resetTranscript, toggleListening } =
    useSpeechRecognition();
  isSupported satisfies boolean;
  listening satisfies boolean;
  transcript satisfies string;
  error satisfies SpeechRecognitionErrorEvent | null;
  resetTranscript satisfies () => void;
  toggleListening satisfies () => void;

  resetTranscript();
  toggleListening();

  // @ts-expect-error - `continuous` should be a boolean.
  useSpeechRecognition({ continuous: 'true' });
  // @ts-expect-error - `lang` should be a string.
  useSpeechRecognition({ lang: true });
  // @ts-expect-error - Interim results are not exposed by the hook.
  useSpeechRecognition({ interimResults: true });
  // @ts-expect-error - Recognition alternatives are not exposed by the hook.
  useSpeechRecognition({ maxAlternatives: 2 });
  // @ts-expect-error - `unknown` is not a valid option.
  useSpeechRecognition({ unknown: 'unknown' });
  // @ts-expect-error - `useSpeechRecognition` accepts only one argument.
  useSpeechRecognition({}, {});
}

// #endregion useSpeechRecognition
// --------------------------------------------------------------------------------
