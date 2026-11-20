/**
 * @fileoverview SSR test for `use-previous-distinct.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { usePreviousDistinct } from './use-previous-distinct.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous-distinct', () => {
  it('starts with empty history on the server', () => {
    function HistoryLength() {
      const history = usePreviousDistinct('first', { history: true });
      return history.length;
    }

    assert.strictEqual(renderToString(<HistoryLength />), '0');
  });
});
