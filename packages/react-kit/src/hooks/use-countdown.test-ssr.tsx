/**
 * @fileoverview SSR test for `use-countdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useCountdown } from './use-countdown.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-countdown', () => {
  it('renders the initial countdown duration on the server', () => {
    function Countdown() {
      const [count] = useCountdown(3_000);
      return count;
    }

    assert.strictEqual(renderToString(<Countdown />), '3000');
  });
});
