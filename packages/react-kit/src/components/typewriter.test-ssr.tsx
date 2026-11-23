/**
 * @fileoverview SSR test for `typewriter.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Typewriter } from './typewriter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('typewriter', () => {
  it('renders only the cursor before typing begins on the server', () => {
    assert.strictEqual(
      renderToString(<Typewriter text="Hello" />),
      '<span><span class="cursor" aria-hidden="true">|</span></span>',
    );
  });
});
