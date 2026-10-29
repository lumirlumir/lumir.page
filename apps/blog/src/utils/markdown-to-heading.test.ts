/**
 * @fileoverview Tests Markdown heading and section extraction.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, expect, it } from 'vitest';
import { markdownToHeading } from './markdown-to-heading';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-heading', () => {
  it('should return no headings when Markdown has no headings or title', async () => {
    assert.deepStrictEqual(await markdownToHeading(''), []);
    assert.deepStrictEqual(await markdownToHeading('Plain body text.'), []);
  });

  it('should keep the introduction under the generated title', async () => {
    const headings = await markdownToHeading('Intro.\n\n## Section {#section}\n\nBody.', {
      title: 'Article {#article}',
    });

    assert.deepStrictEqual(headings, [
      { id: 'article', text: 'Article', depth: 1, content: 'Intro.' },
      { id: 'section', text: 'Section', depth: 2, content: 'Body.' },
    ]);
  });

  it('should extract flat sections in order and omit text before the first heading', async () => {
    const headings = await markdownToHeading(
      'Intro.\n\n## **First** {#first}\n\nFirst body.\n\n### Child {#child}\n\nChild body.\n\n## Last {#last}',
    );

    assert.deepStrictEqual(headings, [
      { id: 'first', text: 'First', depth: 2, content: 'First body.' },
      { id: 'child', text: 'Child', depth: 3, content: 'Child body.' },
      { id: 'last', text: 'Last', depth: 2, content: '' },
    ]);
  });

  it('should extract nested headings and collect body blocks without treating code as headings', async () => {
    const headings = await markdownToHeading(
      '> ## Quoted {#quoted}\n>\n> Body.\n\n- List item\n\n```md\n## Code\n```',
    );

    assert.deepStrictEqual(headings, [
      {
        id: 'quoted',
        text: 'Quoted',
        depth: 2,
        content: 'Body. List item ## Code',
      },
    ]);
  });

  it('should reject a heading without a custom ID and report its source line', async () => {
    await expect(markdownToHeading('Intro.\n\n## Missing')).rejects.toThrow(
      'Heading "Missing" at line 3 needs an explicit custom ID',
    );
  });

  it('should reject a custom ID inside formatted text', async () => {
    await expect(markdownToHeading('## **Formatted {#ignored}**')).rejects.toThrow(
      'Heading "Formatted {#ignored}" at line 1 needs an explicit custom ID',
    );
  });

  it('should reject a supplied title without a custom ID', async () => {
    await expect(markdownToHeading('Body.', { title: 'Article' })).rejects.toThrow(
      'Heading "Article" at line 1 needs an explicit custom ID',
    );
  });
});
