/**
 * @fileoverview Tests post and section search against rendered Markdown.
 */

import MiniSearch from 'minisearch';
import { assert, describe, it } from 'vitest';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import { markdownToHtml } from './markdown-to-html';
import { markdownToSearchData } from './markdown-to-search-data';
import { createLocalSearch, createSearchDocuments } from './search';

const post: VMarkdownFileMeta = {
  id: 'example.ko',
  slug: 'example',
  lang: 'ko',
  readtime: 1,
  data: {
    title: 'Example article',
    description: 'Metadata summary',
    created: '2026-10-03',
    updated: '2026-10-03',
    categories: [],
    references: [],
  },
};

describe('search', () => {
  it('returns a native MiniSearch instance that finds body-only terms', async () => {
    const sections = await markdownToSearchData(
      '제목과 설명에 없는 툴팁 내용을 검색합니다.',
      {
        title: 'Example article {#example}',
      },
    );
    const documents = createSearchDocuments(post, sections);
    const search = createLocalSearch(documents);

    assert.instanceOf(search, MiniSearch);
    assert.lengthOf(search.search('툴팁'), 1);
    assert.strictEqual(search.search('툴팁')[0].url, '/ko/posts/example');
    assert.deepEqual(search.search('툴팁')[0].match['툴팁'], ['content']);
    assert.strictEqual(search.search('툴팁')[0].readtime, 1);
  });

  it('indexes paragraphs, lists, image alt text, links, references, and inline HTML', async () => {
    const sections = await markdownToSearchData(
      '소개문단\n\n- 목록항목\n\n![이미지설명](image.png)\n\n[링크문구][reference] 주변텍스트\n\n<span>인라인텍스트</span>\n\n각주[^note]\n\n[^note]: 각주본문\n\n[reference]: https://example.com',
      { title: 'Example article {#example}' },
    );
    const documents = createSearchDocuments(post, sections);
    const search = createLocalSearch(documents);

    assert.lengthOf(search.search('소개문단'), 1);
    assert.lengthOf(search.search('목록항목'), 1);
    assert.lengthOf(search.search('이미지설명'), 1);
    assert.lengthOf(search.search('링크문구'), 1);
    assert.lengthOf(search.search('주변텍스트'), 1);
    assert.lengthOf(search.search('인라인텍스트'), 1);
    assert.lengthOf(search.search('각주본문'), 1);
  });

  it('preserves a post introduction and distinct H1 through H6 section records', async () => {
    const sections = await markdownToSearchData(
      'Introduction.\n\n# One\n\nFirst.\n\n## Two\n\nSecond.\n\n### Three\n\nThird.\n\n#### Four\n\nFourth.\n\n##### Five\n\nFifth.\n\n###### Six\n\nSixth.',
      { title: 'Example article {#example}' },
    );
    const documents = createSearchDocuments(post, sections);

    assert.lengthOf(documents, 7);
    assert.strictEqual(documents[0].content, 'Introduction.');
    assert.strictEqual(documents[0].url, '/ko/posts/example');
    assert.strictEqual(documents[1].url, '/ko/posts/example#one');
    assert.strictEqual(documents[2].url, '/ko/posts/example#two');
    assert.strictEqual(documents[3].url, '/ko/posts/example#three');
    assert.strictEqual(documents[4].url, '/ko/posts/example#four');
    assert.strictEqual(documents[5].url, '/ko/posts/example#five');
    assert.strictEqual(documents[6].url, '/ko/posts/example#six');
    assert.strictEqual(documents[6].content, 'Sixth.');
    assert.strictEqual(createLocalSearch(documents).search('Sixth')[0].heading, 'Six');
  });

  it('matches rendered IDs for custom, duplicate, Setext, and raw HTML headings', async () => {
    const content =
      '## Custom {#chosen}\n\nBody.\n\n## **Repeated**\n\nFirst.\n\n## Repeated\n\nSecond.\n\nSetext\n------\n\nThird.\n\n<section><h3 id="raw-heading">Raw</h3><p>Fourth.</p></section>';
    const sections = await markdownToSearchData(content, {
      title: 'Example article {#example}',
    });
    const documents = createSearchDocuments(post, sections);
    const html = await markdownToHtml(content, { title: 'Example article {#example}' });

    assert.strictEqual(documents[1].url, '/ko/posts/example#chosen');
    assert.strictEqual(documents[1].heading, 'Custom');
    assert.include(html, 'id="chosen"');
    assert.strictEqual(documents[2].url, '/ko/posts/example#repeated');
    assert.include(html, 'id="repeated"');
    assert.strictEqual(documents[3].url, '/ko/posts/example#repeated-1');
    assert.include(html, 'id="repeated-1"');
    assert.strictEqual(documents[4].url, '/ko/posts/example#setext');
    assert.include(html, 'id="setext"');
    assert.strictEqual(documents[5].url, '/ko/posts/example#raw-heading');
    assert.strictEqual(documents[5].content, 'Fourth.');
    assert.include(html, 'id="raw-heading"');
  });

  it('encodes Unicode and spaces in custom section anchors', async () => {
    const sections = await markdownToSearchData('## 제목 {#한글 anchor}\n\n본문.', {
      title: 'Example article {#example}',
    });
    const documents = createSearchDocuments(post, sections);

    assert.strictEqual(documents[1].url, '/ko/posts/example#%ED%95%9C%EA%B8%80%20anchor');
  });

  it('does not join adjacent blocks or split words across inline formatting', async () => {
    const sections = await markdownToSearchData(
      '<div><p>First</p><p>Second</p></div>\n\ntool**tip** and <kbd>keyboard</kbd>.',
      { title: 'Example article {#example}' },
    );
    const documents = createSearchDocuments(post, sections);

    assert.strictEqual(documents[0].content, 'First Second tooltip and keyboard.');
    assert.lengthOf(createLocalSearch(documents).search('tooltip'), 1);
  });

  it('excludes comments, scripts, styles, templates, and hidden HTML from search', async () => {
    const sections = await markdownToSearchData(
      'Visible.\n\n<!-- commentsecret -->\n\n<script>scriptsecret</script>\n\n<style>stylesecret</style>\n\n<template>templatesecret</template>\n\n<div hidden>hiddensecret</div>\n\n<div aria-hidden="true">ariasecret</div>',
      { title: 'Example article {#example}' },
    );
    const documents = createSearchDocuments(post, sections);

    assert.strictEqual(documents[0].content, 'Visible.');
  });

  it('keeps metadata matches on the post record and heading matches on their section', async () => {
    const sections = await markdownToSearchData(
      'Intro.\n\n## Installation\n\nSetup.\n\n## Troubleshooting\n\nDiagnostics.',
      { title: 'Example article {#example}' },
    );
    const documents = createSearchDocuments(post, sections);
    const search = createLocalSearch(documents);

    assert.lengthOf(search.search('article'), 1);
    assert.strictEqual(search.search('article')[0].url, '/ko/posts/example');
    assert.lengthOf(search.search('summary'), 1);
    assert.strictEqual(
      search.search('Installation')[0].url,
      '/ko/posts/example#installation',
    );
    assert.deepEqual(search.search('Installation')[0].match.installation, ['heading']);
  });

  it('preserves prefix and fuzzy matching in section body text', async () => {
    const sections = await markdownToSearchData('## Setup\n\nJavaScript configuration.', {
      title: 'Example article {#example}',
    });
    const documents = createSearchDocuments(post, sections);
    const search = createLocalSearch(documents);

    assert.strictEqual(search.search('JavaScr')[0].url, '/ko/posts/example#setup');
    assert.strictEqual(search.search('javascropt')[0].url, '/ko/posts/example#setup');
    assert.deepEqual(search.search('javascropt')[0].match.javascript, ['content']);
  });
});
