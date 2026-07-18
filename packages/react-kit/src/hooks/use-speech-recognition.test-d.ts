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

// TODO: Add type tests for `UseSpeechRecognitionOptions` and `useSpeechRecognition`.

({}) as typeof useSpeechRecognition satisfies Function;
({}) as Parameters<typeof useSpeechRecognition>[0] satisfies
  UseSpeechRecognitionOptions | undefined;
