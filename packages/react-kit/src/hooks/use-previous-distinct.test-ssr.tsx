import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { usePreviousDistinct } from './use-previous-distinct.js';

it('starts with empty history on the server', () => {
  function HistoryLength() {
    const history = usePreviousDistinct('first', { history: true });
    return history.length;
  }

  assert.strictEqual(renderToString(<HistoryLength />), '0');
});
