/**
 * @fileoverview SSR test for `use-scroll.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useScroll } from './use-scroll.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-scroll', () => {
  it('renders the scroll target on the server', () => {
    function ScrollTarget() {
      const [ref] = useScroll<HTMLDivElement>();
      return <div ref={ref}>Target</div>;
    }

    assert.strictEqual(renderToString(<ScrollTarget />), '<div>Target</div>');
  });
});
