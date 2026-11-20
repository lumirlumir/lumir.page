/**
 * @fileoverview SSR test for `cursor-splash.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CursorSplash } from './cursor-splash.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('cursor-splash', () => {
  it('renders the splash canvas on the server', () => {
    assert.strictEqual(renderToString(<CursorSplash />), '<div><canvas></canvas></div>');
  });
});
