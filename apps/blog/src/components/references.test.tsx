/**
 * @fileoverview Test for `references.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { References } from './references';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('references', () => {
  it('should set the references anchor ID on the heading', async () => {
    const screen = await render(
      <References lang="ko" references={['https://example.com']} />,
    );

    assert.strictEqual(screen.container.querySelector('h2')?.id, 'references');
  });
});
