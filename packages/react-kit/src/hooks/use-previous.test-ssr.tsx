import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { usePrevious } from './use-previous.js';

it('returns the initial value as the previous value on the server', () => {
  function PreviousValue() {
    return usePrevious('first');
  }

  assert.strictEqual(renderToString(<PreviousValue />), 'first');
});
