/**
 * @fileoverview Test for `use-speech-recognition.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useSpeechRecognition } from './use-speech-recognition.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-speech-recognition', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('`transcript` should not prepend a space to the first recognition result', async () => {
    // Mock
    const speechRecognition = { onresult: vi.fn(), stop: vi.fn() };

    function createSpeechRecognition() {
      return speechRecognition;
    }

    vi.stubGlobal('SpeechRecognition', vi.fn(createSpeechRecognition));

    // Test
    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { transcript: firstTranscript } = result.current;

    assert.strictEqual(firstTranscript, '');

    await act(async () => {
      speechRecognition.onresult({
        results: [[{ transcript: 'Hello' }]],
      });
    });

    const { transcript: secondTranscript } = result.current;

    assert.strictEqual(secondTranscript, 'Hello');

    await act(async () => {
      speechRecognition.onresult({
        results: [[{ transcript: ' world' }]],
      });
    });

    const { transcript: thirdTranscript } = result.current;

    assert.strictEqual(thirdTranscript, 'Hello world');
  });
});
