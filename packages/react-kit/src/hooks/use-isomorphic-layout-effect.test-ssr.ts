import { assert, it } from 'vitest';
import { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

it('uses useEffect when the DOM is unavailable', () => {
  assert.strictEqual(useIsomorphicLayoutEffect, useEffect);
});
