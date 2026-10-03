/**
 * @fileoverview Tests Markdown search data extraction.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { markdownToHtml } from './markdown-to-html';
import { markdownToSearchData } from './markdown-to-search-data';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-search-data', () => {
  it('returns an empty introduction record for empty Markdown', async () => {
    assert.deepEqual(await markdownToSearchData(''), [
      { heading: '', anchor: '', content: '' },
    ]);
  });

  it('keeps body text in the introduction when there are no headings', async () => {
    assert.deepEqual(await markdownToSearchData('제목과 설명에 없는 툴팁 본문입니다.'), [
      { heading: '', anchor: '', content: '제목과 설명에 없는 툴팁 본문입니다.' },
    ]);
  });

  it('skips the generated article title and preserves the first body heading', async () => {
    const data = await markdownToSearchData('Intro.\n\n# First section\n\nBody.', {
      title: 'Article title {#article}',
    });

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: 'Intro.' },
      { heading: 'First section', anchor: 'first-section', content: 'Body.' },
    ]);
  });

  it('extracts all six heading levels without a generated article title', async () => {
    const data = await markdownToSearchData(
      'Intro.\n\n# One\n\nFirst.\n\n## Two\n\nSecond.\n\n### Three\n\nThird.\n\n#### Four\n\nFourth.\n\n##### Five\n\nFifth.\n\n###### Six\n\nSixth.',
    );

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: 'Intro.' },
      { heading: 'One', anchor: 'one', content: 'First.' },
      { heading: 'Two', anchor: 'two', content: 'Second.' },
      { heading: 'Three', anchor: 'three', content: 'Third.' },
      { heading: 'Four', anchor: 'four', content: 'Fourth.' },
      { heading: 'Five', anchor: 'five', content: 'Fifth.' },
      { heading: 'Six', anchor: 'six', content: 'Sixth.' },
    ]);
  });

  it('keeps consecutive headings as separate sections with empty bodies', async () => {
    const data = await markdownToSearchData('## First\n\n### Second');

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: '' },
      { heading: 'First', anchor: 'first', content: '' },
      { heading: 'Second', anchor: 'second', content: '' },
    ]);
  });

  it('shares custom and duplicate heading anchors with rendered HTML', async () => {
    const markdown =
      '## **Custom** {#한글 anchor}\n\nFirst.\n\n## Repeated\n\nSecond.\n\n## Repeated\n\nThird.';
    const data = await markdownToSearchData(markdown);
    const html = await markdownToHtml(markdown);

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: '' },
      { heading: 'Custom', anchor: '한글 anchor', content: 'First.' },
      { heading: 'Repeated', anchor: 'repeated', content: 'Second.' },
      { heading: 'Repeated', anchor: 'repeated-1', content: 'Third.' },
    ]);
    assert.include(html, 'id="한글 anchor"');
    assert.include(html, 'id="repeated"');
    assert.include(html, 'id="repeated-1"');
  });

  it('extracts Setext headings and headings inside HTML sections', async () => {
    const data = await markdownToSearchData(
      'Setext\n------\n\nFirst.\n\n<section><h3 id="raw-heading">Raw <em>heading</em></h3><p>Second.</p></section>',
    );

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: '' },
      { heading: 'Setext', anchor: 'setext', content: 'First.' },
      { heading: 'Raw heading', anchor: 'raw-heading', content: 'Second.' },
    ]);
  });

  it('extracts list items, image alt text, and reference link text without their URLs', async () => {
    const data = await markdownToSearchData(
      'Paragraph.\n\n- First item\n- Second item\n\n![Image description](image.png)\n\n[Reference text][source] nearby text.\n\n[source]: https://example.com',
    );

    assert.deepEqual(data, [
      {
        heading: '',
        anchor: '',
        content:
          'Paragraph. First item Second item Image description Reference text nearby text.',
      },
    ]);
  });

  it('separates adjacent blocks and line breaks while preserving inline words', async () => {
    const data = await markdownToSearchData(
      '<div><p>First</p><p>Second</p></div>\n\ntool**tip** and <kbd>keyboard</kbd>.<br>Next.',
    );

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: 'First Second tooltip and keyboard. Next.' },
    ]);
  });

  it('excludes comments and hidden subtrees including their headings', async () => {
    const data = await markdownToSearchData(
      'Visible.\n\n<!-- commentsecret -->\n\n<script>scriptsecret</script>\n\n<style>stylesecret</style>\n\n<template>templatesecret</template>\n\n<div hidden><h2>Hidden heading</h2>hiddensecret</div>\n\n<div aria-hidden="true">ariasecret</div>\n\n<div aria-hidden="false">Also visible.</div>',
    );

    assert.deepEqual(data, [
      { heading: '', anchor: '', content: 'Visible. Also visible.' },
    ]);
  });
});
