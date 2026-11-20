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
  it('should render a permalink to the references heading', async () => {
    const screen = await render(
      <References lang="ko" references={['https://example.com']} />,
    );
    const heading = screen.container.querySelector('h2');

    assert.strictEqual(heading?.id, 'references');
    assert.strictEqual(
      heading?.querySelector(':scope > a[aria-hidden="true"]')?.getAttribute('href'),
      '#references',
    );
  });
});
