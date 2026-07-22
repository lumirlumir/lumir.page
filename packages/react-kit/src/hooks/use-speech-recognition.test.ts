/**
 * @fileoverview Test for `use-speech-recognition.ts`
 */

// TODO: add more tests

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
    const helloResult = { 0: { transcript: 'Hello' }, isFinal: true };
    const worldResult = { 0: { transcript: ' world' }, isFinal: true };

    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { transcript: firstTranscript } = result.current;

    assert.strictEqual(firstTranscript, '');

    await act(async () => {
      speechRecognition.onresult({
        resultIndex: 0,
        results: [helloResult],
      });
    });

    const { transcript: secondTranscript } = result.current;

    assert.strictEqual(secondTranscript, 'Hello');

    await act(async () => {
      speechRecognition.onresult({
        resultIndex: 1,
        results: [helloResult, worldResult],
      });
    });

    const { transcript: thirdTranscript } = result.current;

    assert.strictEqual(thirdTranscript, 'Hello world');
  });

  it('`transcript` should append only the final version of an interim result', async () => {
    const { act, result } = await renderHook(() => useSpeechRecognition());

    await act(async () => {
      speechRecognition.onresult({
        resultIndex: 0,
        results: [{ 0: { transcript: '안' }, isFinal: false }],
      });
      speechRecognition.onresult({
        resultIndex: 0,
        results: [{ 0: { transcript: '안녕' }, isFinal: false }],
      });
    });

    const { transcript: firstTranscript } = result.current;

    assert.strictEqual(firstTranscript, '');

    await act(async () => {
      speechRecognition.onresult({
        resultIndex: 0,
        results: [{ 0: { transcript: '안녕하세요' }, isFinal: true }],
      });
    });

    const { transcript: secondTranscript } = result.current;

    assert.strictEqual(secondTranscript, '안녕하세요');
  });

  it('`transcript` should not duplicate a final result when an interim result is removed', async () => {
    const finalResult = { 0: { transcript: 'Hello' }, isFinal: true };
    const interimResult = { 0: { transcript: ' world' }, isFinal: false };

    const { act, result } = await renderHook(() => useSpeechRecognition());

    await act(async () => {
      speechRecognition.onresult({ resultIndex: 0, results: [finalResult] });
      speechRecognition.onresult({
        resultIndex: 1,
        results: [finalResult, interimResult],
      });
      speechRecognition.onresult({ resultIndex: 1, results: [finalResult] });
    });

    const { transcript } = result.current;

    assert.strictEqual(transcript, 'Hello');
  });

  it('`start` should be called only once while the start event is pending', async () => {
    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { toggleListening } = result.current;

    await act(async () => {
      toggleListening();
      toggleListening();
      toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 1);
  });

  it('an earlier `toggleListening` callback should stop the current recognition', async () => {
    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { toggleListening } = result.current;

    await act(async () => {
      toggleListening();
      speechRecognition.onstart();
    });

    await act(async () => {
      toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 1);
    assert.strictEqual(speechRecognition.stop.mock.calls.length, 1);
  });

  it('an earlier `toggleListening` callback should start a new recognition after the current recognition ends', async () => {
    const { act, result } = await renderHook(() => useSpeechRecognition());

    await act(async () => {
      result.current.toggleListening();
      speechRecognition.onstart();
    });

    const { toggleListening } = result.current;

    await act(async () => {
      speechRecognition.onend();
    });

    await act(async () => {
      toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 2);
    assert.strictEqual(speechRecognition.stop.mock.calls.length, 0);
  });

  it('`start` should not be called between the `error` and `end` events', async () => {
    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { toggleListening } = result.current;

    await act(async () => {
      toggleListening();
      speechRecognition.onstart();
      speechRecognition.onerror({ error: 'network' });
      toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 1);

    await act(async () => {
      speechRecognition.onend();
      toggleListening();
    });

    assert.strictEqual(speechRecognition.start.mock.calls.length, 2);
  });

  it('`isSupported` should be false when speech recognition is unavailable', async () => {
    vi.stubGlobal('SpeechRecognition', undefined);
    vi.stubGlobal('webkitSpeechRecognition', undefined);

    const { result } = await renderHook(() => useSpeechRecognition());

    const { isSupported } = result.current;

    assert.strictEqual(isSupported, false);
  });

  it('`error` should expose the latest speech recognition error', async () => {
    const recognitionError = { error: 'network' };

    const { act, result } = await renderHook(() => useSpeechRecognition());

    const { isSupported, error: firstError } = result.current;

    assert.strictEqual(isSupported, true);
    assert.strictEqual(firstError, null);

    await act(async () => {
      speechRecognition.onerror(recognitionError);
    });

    const { error: secondError } = result.current;

    assert.strictEqual(secondError, recognitionError);

    await act(async () => {
      speechRecognition.onend();
      result.current.toggleListening();
    });

    const { error: thirdError } = result.current;

    assert.strictEqual(thirdError, null);
  });
});
