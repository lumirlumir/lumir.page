/**
 * @fileoverview SSR test for `use-speech-recognition.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useSpeechRecognition } from './use-speech-recognition.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-speech-recognition', () => {
  it('reports speech recognition as unsupported on the server', () => {
    function SpeechSupport() {
      const { isSupported } = useSpeechRecognition();
      return String(isSupported);
    }

    assert.strictEqual(renderToString(<SpeechSupport />), 'false');
  });
});
