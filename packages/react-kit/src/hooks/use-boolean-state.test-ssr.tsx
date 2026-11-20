import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useBooleanState } from './use-boolean-state.js';

it('renders the initial boolean state on the server', () => {
  function BooleanState() {
    const [value] = useBooleanState(true);
    return String(value);
  }

  assert.strictEqual(renderToString(<BooleanState />), 'true');
});
