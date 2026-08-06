/**
 * @fileoverview Test for `cursor-splash.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { CursorSplash } from './cursor-splash.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('cursor-splash', () => {
  it('should leave visual styling to consumer-provided classes', async () => {
    const screen = await render(
      <CursorSplash className="cursor-splash" id="cursor-effect" aria-hidden="true" />,
    );

    const container = screen.container.querySelector('#cursor-effect');
    const canvas = container?.querySelector('canvas');

    assert.ok(container);
    assert.ok(canvas);
    assert.strictEqual(container.className, 'cursor-splash');
    assert.strictEqual(container.getAttribute('aria-hidden'), 'true');
    assert.strictEqual(container.getAttribute('style'), null);
    assert.strictEqual(canvas.getAttribute('class'), null);
    assert.strictEqual(canvas.getAttribute('id'), null);
    assert.strictEqual(canvas.getAttribute('style'), null);
  });
});
