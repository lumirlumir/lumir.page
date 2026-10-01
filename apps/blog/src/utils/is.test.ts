/**
 * @fileoverview Test for `is.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { isConfig, isFrontmatter } from './is.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('is-config', () => {
  describe('when the data matches the config shape', () => {
    it('should return `true` when cursorSplash is a boolean', () => {
      assert.strictEqual(isConfig({ cursorSplash: true }), true);
    });

    it('should return `true` when extra fields are present', () => {
      assert.strictEqual(isConfig({ cursorSplash: false, theme: 'dark' }), true);
    });
  });

  describe('when the data is not an object', () => {
    it('should return `false` for null', () => {
      assert.strictEqual(isConfig(null), false);
    });

    it('should return `false` for an array', () => {
      assert.strictEqual(isConfig([]), false);
    });

    it('should return `false` for a string', () => {
      assert.strictEqual(isConfig('cursorSplash'), false);
    });
  });

  describe('when cursorSplash is invalid', () => {
    it('should return `false` when cursorSplash is missing', () => {
      assert.strictEqual(isConfig({}), false);
    });

    it('should return `false` when cursorSplash is not a boolean', () => {
      assert.strictEqual(isConfig({ cursorSplash: 'true' }), false);
    });
  });
});

describe('is-frontmatter', () => {
  describe('when the data matches the frontmatter shape', () => {
    it('should return `true` for frontmatter with all required fields', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript', 'markdown'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), true);
    });

    it('should return `true` when categories and references are empty arrays', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: [],
        references: [],
      };

      assert.strictEqual(isFrontmatter(data), true);
    });

    it('should return `true` when extra fields are present', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
        draft: true,
      };

      assert.strictEqual(isFrontmatter(data), true);
    });
  });

  describe('when the data is not an object', () => {
    it('should return `false` for null', () => {
      assert.strictEqual(isFrontmatter(null), false);
    });

    it('should return `false` for an array', () => {
      assert.strictEqual(isFrontmatter([]), false);
    });

    it('should return `false` for a string', () => {
      assert.strictEqual(isFrontmatter('title: Example Post'), false);
    });
  });

  describe('when a required field is missing', () => {
    it('should return `false` when title is missing', () => {
      const data = {
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when description is missing', () => {
      const data = {
        title: 'Example Post',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when created is missing', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when updated is missing', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when categories is missing', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when references is missing', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });
  });

  describe('when a required field has an invalid value', () => {
    it('should return `false` when title is not a string', () => {
      const data = {
        title: 404,
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when description is not a string', () => {
      const data = {
        title: 'Example Post',
        description: ['This is an example post.'],
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when created is not a string', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: 20240101,
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when updated is not a string', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: 20240102,
        categories: ['javascript'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when categories is not an array', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: 'nextjs',
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when categories contains an unknown category', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript', 'unknown'],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when categories contains a non-string value', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript', 404],
        references: ['https://example.com/reference'],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when references is not an array', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: 'https://example.com/reference',
      };

      assert.strictEqual(isFrontmatter(data), false);
    });

    it('should return `false` when references contains a non-string value', () => {
      const data = {
        title: 'Example Post',
        description: 'This is an example post.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript'],
        references: ['https://example.com/reference', 404],
      };

      assert.strictEqual(isFrontmatter(data), false);
    });
  });
});
