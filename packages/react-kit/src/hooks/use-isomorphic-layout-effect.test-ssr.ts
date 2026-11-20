/**
 * @fileoverview SSR test for `use-isomorphic-layout-effect.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-isomorphic-layout-effect', () => {
  it('uses useEffect when the DOM is unavailable', () => {
    assert.strictEqual(useIsomorphicLayoutEffect, useEffect);
  });
});
