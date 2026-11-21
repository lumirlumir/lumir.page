/**
 * @fileoverview SSR test for `use-previous.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { usePrevious } from './use-previous.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous', () => {
  it('returns the initial value as the previous value on the server', () => {
    function PreviousValue() {
      return usePrevious('first');
    }

    assert.strictEqual(renderToString(<PreviousValue />), 'first');
  });
});
