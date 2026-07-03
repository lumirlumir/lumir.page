/**
 * @fileoverview Test for `use-isomorphic-layout-effect.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { useEffect, useLayoutEffect } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-isomorphic-layout-effect', () => {
  it('Should use `useLayoutEffect` when `window` is available', async () => {
    // Vitest runs this file in Browser Mode, so `window` is always available here.
    // The SSR branch should be tested with a separate Node Vitest config if needed.
    assert.notStrictEqual(window, undefined);

    assert.strictEqual(useIsomorphicLayoutEffect, useLayoutEffect);
    assert.notStrictEqual(useIsomorphicLayoutEffect, useEffect);
  });
});
