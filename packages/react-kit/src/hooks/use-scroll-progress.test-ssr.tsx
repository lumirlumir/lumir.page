/**
 * @fileoverview SSR test for `use-scroll-progress.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useScrollProgress } from './use-scroll-progress.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-scroll-progress', () => {
  it('does not report scroll progress during server rendering', () => {
    const onProgress = vi.fn();

    function ScrollProgress() {
      useScrollProgress(onProgress);
      return null;
    }

    renderToString(<ScrollProgress />);
    assert.lengthOf(onProgress.mock.calls, 0);
  });
});
