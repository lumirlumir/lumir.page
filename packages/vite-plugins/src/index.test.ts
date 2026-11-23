/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { vitePluginMarkdown, vitePluginServerOnly } from './index.js';
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
    it('`vitePluginMarkdown` should be defined', () => {
      assert.isDefined(vitePluginMarkdown);
      assert.strictEqual(typeof vitePluginMarkdown, 'function');
    });

    it('`vitePluginServerOnly` should be defined', () => {
      assert.isDefined(vitePluginServerOnly);
      assert.strictEqual(typeof vitePluginServerOnly, 'function');
    });
  });
});
