import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useTypewriter } from './use-typewriter.js';

it('renders the full text before erasing begins on the server', () => {
  function ErasingText() {
    const [text] = useTypewriter('Hello', { mode: 'erase' });
    return text;
  }

  assert.strictEqual(renderToString(<ErasingText />), 'Hello');
});
