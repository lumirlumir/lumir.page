/**
 * @fileoverview Tests Markdown heading and section extraction.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { markdownToHtml } from './markdown-to-html';
import { markdownToHeading } from './markdown-to-heading';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-heading', () => {
  it('returns no headings for empty Markdown without a title', async () => {
    assert.deepEqual(await markdownToHeading(''), []);
  });

  it('returns no headings for plain body text without a title', async () => {
    assert.deepEqual(await markdownToHeading('제목과 설명에 없는 툴팁 본문입니다.'), []);
  });

  it('keeps plain body text under the generated article H1', async () => {
    const headings = await markdownToHeading('제목과 설명에 없는 툴팁 본문입니다.', {
      title: 'Article title {#article}',
    });

    assert.deepEqual(headings, [
      {
        id: 'article',
        heading: 'Article title',
        level: 1,
        parent: null,
        content: '제목과 설명에 없는 툴팁 본문입니다.',
      },
    ]);
  });

  it('keeps the generated title as an empty H1 when the body is empty', async () => {
    assert.deepEqual(await markdownToHeading('', { title: 'Article {#article}' }), [
      { id: 'article', heading: 'Article', level: 1, parent: null, content: '' },
    ]);
  });

  it('keeps the introduction under the generated H1 and body headings as sections', async () => {
    const headings = await markdownToHeading('Intro.\n\n## First section\n\nBody.', {
      title: 'Article title {#article}',
    });

    assert.deepEqual(headings, [
      {
        id: 'article',
        heading: 'Article title',
        level: 1,
        parent: null,
        content: 'Intro.',
      },
      {
        id: 'first-section',
        heading: 'First section',
        level: 2,
        parent: { id: 'article', heading: 'Article title', level: 1, parent: null },
        content: 'Body.',
      },
    ]);
  });

  it('omits text before the first body heading when no title is provided', async () => {
    assert.deepEqual(await markdownToHeading('Intro.\n\n## Section\n\nBody.'), [
      { id: 'section', heading: 'Section', level: 2, parent: null, content: 'Body.' },
    ]);
  });

  it('extracts all six levels with recursive parent metadata and separate bodies', async () => {
    const one = { id: 'one', heading: 'One', level: 1, parent: null } as const;
    const two = { id: 'two', heading: 'Two', level: 2, parent: one } as const;
    const three = { id: 'three', heading: 'Three', level: 3, parent: two } as const;
    const four = { id: 'four', heading: 'Four', level: 4, parent: three } as const;
    const five = { id: 'five', heading: 'Five', level: 5, parent: four } as const;
    const headings = await markdownToHeading(
      '# One\n\nFirst.\n\n## Two\n\nSecond.\n\n### Three\n\nThird.\n\n#### Four\n\nFourth.\n\n##### Five\n\nFifth.\n\n###### Six\n\nSixth.',
    );

    assert.deepEqual(headings, [
      { ...one, content: 'First.' },
      { ...two, content: 'Second.' },
      { ...three, content: 'Third.' },
      { ...four, content: 'Fourth.' },
      { ...five, content: 'Fifth.' },
      { id: 'six', heading: 'Six', level: 6, parent: five, content: 'Sixth.' },
    ]);
    assert.notProperty(headings[5].parent, 'content');
  });

  it('connects siblings to their direct parent and resets ancestry for a new H1', async () => {
    const headings = await markdownToHeading(
      '# Article\n\n## Installation\n\n### Windows\n\n#### Advanced\n\n### macOS\n\n## FAQ\n\n# Another article\n\n### Skipped level',
    );

    assert.isNull(headings[0].parent);
    assert.strictEqual(headings[1].parent?.id, 'article');
    assert.strictEqual(headings[2].parent?.id, 'installation');
    assert.strictEqual(headings[3].parent?.id, 'windows');
    assert.strictEqual(headings[4].parent, headings[2].parent);
    assert.strictEqual(headings[5].parent, headings[1].parent);
    assert.isNull(headings[6].parent);
    assert.strictEqual(headings[7].level, 3);
    assert.strictEqual(headings[7].parent?.id, 'another-article');
  });

  it('uses the nearest lower-level heading when levels are skipped', async () => {
    const headings = await markdownToHeading(
      '## Root\n\n##### Deep\n\n### Shallow\n\n## Sibling',
    );

    assert.isNull(headings[0].parent);
    assert.strictEqual(headings[1].level, 5);
    assert.strictEqual(headings[1].parent?.id, 'root');
    assert.strictEqual(headings[2].level, 3);
    assert.strictEqual(headings[2].parent, headings[1].parent);
    assert.isNull(headings[3].parent);
  });

  it('keeps consecutive headings as separate sections with empty bodies', async () => {
    assert.deepEqual(await markdownToHeading('## First\n\n### Second'), [
      { id: 'first', heading: 'First', level: 2, parent: null, content: '' },
      {
        id: 'second',
        heading: 'Second',
        level: 3,
        parent: { id: 'first', heading: 'First', level: 2, parent: null },
        content: '',
      },
    ]);
  });

  it('matches rendered custom and duplicate IDs without including custom ID syntax in text', async () => {
    const markdown =
      '## **Custom** {#한글 anchor}\n\nFirst.\n\n## Repeated\n\nSecond.\n\n## Repeated\n\nThird.';
    const headings = await markdownToHeading(markdown);
    const html = await markdownToHtml(markdown);

    assert.deepEqual(headings, [
      { id: '한글 anchor', heading: 'Custom', level: 2, parent: null, content: 'First.' },
      { id: 'repeated', heading: 'Repeated', level: 2, parent: null, content: 'Second.' },
      {
        id: 'repeated-1',
        heading: 'Repeated',
        level: 2,
        parent: null,
        content: 'Third.',
      },
    ]);
    assert.include(html, 'id="한글 anchor"');
    assert.include(html, 'id="repeated"');
    assert.include(html, 'id="repeated-1"');
  });

  it('extracts Setext headings and child headings inside HTML sections', async () => {
    assert.deepEqual(
      await markdownToHeading(
        'Setext\n------\n\nFirst.\n\n<section><h3 id="raw-heading">Raw <em>heading</em></h3><p>Second.</p></section>',
      ),
      [
        { id: 'setext', heading: 'Setext', level: 2, parent: null, content: 'First.' },
        {
          id: 'raw-heading',
          heading: 'Raw heading',
          level: 3,
          parent: { id: 'setext', heading: 'Setext', level: 2, parent: null },
          content: 'Second.',
        },
      ],
    );
  });

  it('extracts lists, image alt text, and reference text without their URLs', async () => {
    const headings = await markdownToHeading(
      'Paragraph.\n\n- First item\n- Second item\n\n![Image description](image.png)\n\n[Reference text][source] nearby text.\n\n[source]: https://example.com',
      { title: 'Article {#article}' },
    );

    assert.deepEqual(headings, [
      {
        id: 'article',
        heading: 'Article',
        level: 1,
        parent: null,
        content:
          'Paragraph. First item Second item Image description Reference text nearby text.',
      },
    ]);
  });

  it('separates blocks and line breaks while preserving words across inline formatting', async () => {
    const headings = await markdownToHeading(
      '<div><p>First</p><p>Second</p></div>\n\ntool**tip** and <kbd>keyboard</kbd>.<br>Next.',
      { title: 'Article {#article}' },
    );

    assert.strictEqual(headings[0].content, 'First Second tooltip and keyboard. Next.');
  });

  it('excludes comments and hidden subtrees without altering visible heading ancestry', async () => {
    const headings = await markdownToHeading(
      'Visible.\n\n<!-- commentsecret -->\n\n<script>scriptsecret</script>\n\n<style>stylesecret</style>\n\n<template>templatesecret</template>\n\n<div hidden><h2>Hidden heading</h2>hiddensecret</div>\n\n<div aria-hidden="true">ariasecret</div>\n\n<div aria-hidden="false">Also visible.</div>\n\n### Visible heading\n\nBody.',
      { title: 'Article {#article}' },
    );

    assert.lengthOf(headings, 2);
    assert.strictEqual(headings[0].content, 'Visible. Also visible.');
    assert.strictEqual(headings[1].parent?.id, 'article');
    assert.strictEqual(headings[1].content, 'Body.');
  });

  it('keeps generated IDs and parent stacks independent between conversions', async () => {
    const first = await markdownToHeading('# Repeated\n\n## Child');
    const second = await markdownToHeading('# Repeated\n\n## Child');

    assert.strictEqual(first[0].id, 'repeated');
    assert.strictEqual(second[0].id, 'repeated');
    assert.deepEqual(second, first);
    assert.notStrictEqual(second[1].parent, first[1].parent);
  });
});
