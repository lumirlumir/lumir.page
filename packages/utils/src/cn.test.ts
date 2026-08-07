/**
 * @fileoverview Test for `cn.ts`
 */

/* eslint-disable no-constant-binary-expression -- Test */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { cn } from './cn.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('cn', () => {
  it('strings', () => {
    assert.strictEqual(cn(''), '');
    assert.strictEqual(cn('foo'), 'foo');
    assert.strictEqual(cn(true && 'foo'), 'foo');
    assert.strictEqual(cn(false && 'foo'), '');
  });

  it('strings (variadic)', () => {
    assert.strictEqual(cn(''), '');
    assert.strictEqual(cn('foo', 'bar'), 'foo bar');
    assert.strictEqual(cn(true && 'foo', false && 'bar', 'baz'), 'foo baz');
    assert.strictEqual(cn(false && 'foo', 'bar', 'baz', ''), 'bar baz');
  });

  it('empties', () => {
    assert.strictEqual(cn(''), '');
    assert.strictEqual(cn(undefined), '');
    assert.strictEqual(cn(null), '');
    assert.strictEqual(cn(0), '');
  });

  // Ignores all non-strings
  it('non-strings', () => {
    // number
    assert.strictEqual(cn(1), '');
    assert.strictEqual(cn(1, 2), '');
    assert.strictEqual(cn(Infinity), '');
    assert.strictEqual(cn(NaN), '');
    assert.strictEqual(cn(0), '');

    // null
    assert.strictEqual(cn(null), '');

    // objects
    // @ts-expect-error -- Objects are not valid input for `cn`
    assert.strictEqual(cn({}), '');
    // @ts-expect-error -- Objects are not valid input for `cn`
    assert.strictEqual(cn({ a: 1 }), '');
    // @ts-expect-error -- Objects are not valid input for `cn`
    assert.strictEqual(cn({ a: 1 }, { b: 2 }), '');

    // arrays
    // @ts-expect-error -- Arrays are not valid input for `cn`
    assert.strictEqual(cn([]), '');
    // @ts-expect-error -- Arrays are not valid input for `cn`
    assert.strictEqual(cn(['foo']), '');
    // @ts-expect-error -- Arrays are not valid input for `cn`
    assert.strictEqual(cn(['foo', 'bar']), '');

    // functions
    assert.strictEqual(
      // @ts-expect-error -- Functions are not valid input for `cn`
      cn(() => {}),
      '',
    );
  });
});
