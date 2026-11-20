/**
 * @fileoverview SSR test for `index.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import * as icons from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  it('renders every exported icon as an SVG on the server', () => {
    for (const [name, Icon] of Object.entries(icons)) {
      assert.match(renderToString(<Icon />), /^<svg\b/, name);
    }
  });
});
