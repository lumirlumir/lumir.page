import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useOs } from './use-os.js';

it('renders an undetermined operating system on the server', () => {
  function OsLabel() {
    return useOs();
  }

  assert.strictEqual(renderToString(<OsLabel />), 'undetermined');
});
