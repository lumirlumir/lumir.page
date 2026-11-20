/**
 * @fileoverview SSR test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-toggle', () => {
  it('renders the default toggle state on the server', () => {
    function ToggleState() {
      const [enabled] = useToggle();
      return String(enabled);
    }

    assert.strictEqual(renderToString(<ToggleState />), 'false');
  });
});
