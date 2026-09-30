/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  cn,
  frontmatter,
  frontmatterData,
  countWords,
  readtimeWithCount,
  readtime,
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
    it('`cn` should be defined', () => {
      assert.isDefined(cn);
      assert.strictEqual(typeof cn, 'function');
    });

    it('`frontmatter` should be defined', () => {
      assert.isDefined(frontmatter);
      assert.strictEqual(typeof frontmatter, 'function');
    });

    it('`frontmatterData` should be defined', () => {
      assert.isDefined(frontmatterData);
      assert.strictEqual(typeof frontmatterData, 'function');
    });

    it('`countWords` should count words through the package entry point', () => {
      assert.isDefined(countWords);
      assert.strictEqual(typeof countWords, 'function');
    });

    it('`readtimeWithCount` should estimate time through the package entry point', () => {
      assert.isDefined(readtimeWithCount);
      assert.strictEqual(typeof readtimeWithCount, 'function');
    });

    it('`readtime` should estimate reading time through the package entry point', () => {
      assert.isDefined(readtime);
      assert.strictEqual(typeof readtime, 'function');
    });
  });
});
