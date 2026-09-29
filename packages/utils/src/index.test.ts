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
  readtime,
  readtimeWithCount,
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
    it('`readtime` should estimate reading time through the package entry point', () => {
      assert.deepStrictEqual(readtime('Hello, world!'), {
        minutes: 1,
        time: 600,
        words: { total: 2 },
      });
    });

    it('`countWords` should count words through the package entry point', () => {
      assert.deepStrictEqual(countWords('Hello, world!'), { total: 2 });
    });

    it('`readtimeWithCount` should estimate time through the package entry point', () => {
      assert.deepStrictEqual(readtimeWithCount({ total: 300 }), {
        minutes: 2,
        time: 90000,
      });
    });

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
  });
});
