/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  rehypeCommentRemover,
  rehypeImageLazyLoading,
  rehypeImageUrlReplace,
  rehypeLocalizeGitHubAlertTitle,
} from './index.js';
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
    it('`rehypeCommentRemover` should be defined', () => {
      assert.isFunction(rehypeCommentRemover);
    });

    it('`rehypeImageLazyLoading` should be defined', () => {
      assert.isFunction(rehypeImageLazyLoading);
    });

    it('`rehypeImageUrlReplace` should be defined', () => {
      assert.isFunction(rehypeImageUrlReplace);
    });

    it('`rehypeLocalizeGitHubAlertTitle` should be defined', () => {
      assert.isFunction(rehypeLocalizeGitHubAlertTitle);
    });
  });
});
