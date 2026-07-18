/**
 * @fileoverview Test for `use-speech-recognition.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useSpeechRecognition } from './use-speech-recognition.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-speech-recognition', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed for mocking.
  let speechRecognition: any;

  beforeEach(() => {
    speechRecognition = {
      start: vi.fn(),
      stop: vi.fn(),
      onresult: vi.fn(),
      onstart: vi.fn(),
    };

    function createSpeechRecognition() {
      return speechRecognition;
    }

    vi.stubGlobal('SpeechRecognition', createSpeechRecognition);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('`listening` should reset when an option changes during recognition', async () => {
    const { act, rerender, result } = await renderHook(
      (props?: { continuous: boolean }) => useSpeechRecognition(props),
      { initialProps: { continuous: true } },
    );

    const { listening: firstListening } = result.current;

    assert.strictEqual(firstListening, false);

    await act(async () => {
      speechRecognition.onstart();
    });

    const { listening: secondListening } = result.current;

    assert.strictEqual(secondListening, true);

    await rerender({ continuous: false });

    const { listening: thirdListening } = result.current;

    assert.strictEqual(thirdListening, false);

    await act(async () => {
      result.current.toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 1);
  });

  it('`transcript` should not prepend a space to the first recognition result', async () => {
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
