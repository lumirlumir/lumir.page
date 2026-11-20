import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useSpeechRecognition } from './use-speech-recognition.js';

it('reports speech recognition as unsupported on the server', () => {
  function SpeechSupport() {
    const { isSupported } = useSpeechRecognition();
    return String(isSupported);
  }

  assert.strictEqual(renderToString(<SpeechSupport />), 'false');
});
