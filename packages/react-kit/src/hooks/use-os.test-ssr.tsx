/**
 * @fileoverview SSR test for `use-os.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useOs } from './use-os.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-os', () => {
  it('renders an undetermined operating system on the server', () => {
    function OsLabel() {
      return useOs();
    }

    assert.strictEqual(renderToString(<OsLabel />), 'undetermined');
  });
});
