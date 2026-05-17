/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { rehypeImageLazyLoading, rehypeImageUrlReplace } from './index.js';
import packageJson from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('package.json', () => {
    it('should have `sideEffects: false`', () => {
      assert.strictEqual(packageJson.sideEffects, false);
    });
  });

  describe('exports', () => {
    it('`rehypeImageLazyLoading` should be defined', () => {
      assert.isDefined(rehypeImageLazyLoading);
      assert.strictEqual(typeof rehypeImageLazyLoading, 'function');
    });

    it('`rehypeImageUrlReplace` should be defined', () => {
      assert.isDefined(rehypeImageUrlReplace);
      assert.strictEqual(typeof rehypeImageUrlReplace, 'function');
    });
  });
});
