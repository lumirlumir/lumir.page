/**
 * @fileoverview Tests Markdown heading and section extraction.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, expect, it } from 'vitest';
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
        text: 'Article title',
        depth: 1,
        parent: null,
        content: '제목과 설명에 없는 툴팁 본문입니다.',
      },
    ]);
  });

  it('keeps the generated title as an empty H1 when the body is empty', async () => {
    assert.deepEqual(await markdownToHeading('', { title: 'Article {#article}' }), [
      { id: 'article', text: 'Article', depth: 1, parent: null, content: '' },
    ]);
  });

  it('keeps the introduction under the generated H1 and body headings as sections', async () => {
    const headings = await markdownToHeading(
      'Intro.\n\n## First section {#first-section}\n\nBody.',
      {
        title: 'Article title {#article}',
      },
    );

    assert.deepEqual(headings, [
      {
        id: 'article',
        text: 'Article title',
        depth: 1,
        parent: null,
        content: 'Intro.',
      },
      {
        id: 'first-section',
        text: 'First section',
        depth: 2,
        parent: {
          id: 'article',
          text: 'Article title',
          depth: 1,
          parent: null,
          content: 'Intro.',
        },
        content: 'Body.',
      },
    ]);
  });

  it('omits text before the first body heading when no title is provided', async () => {
    assert.deepEqual(
      await markdownToHeading('Intro.\n\n## Section {#section}\n\nBody.'),
      [{ id: 'section', text: 'Section', depth: 2, parent: null, content: 'Body.' }],
    );
  });

  it('extracts all six depths with recursive parent metadata and separate bodies', async () => {
    const one = {
      id: 'one',
      text: 'One',
      depth: 1,
      parent: null,
      content: 'First.',
    } as const;
    const two = {
      id: 'two',
      text: 'Two',
      depth: 2,
      parent: one,
      content: 'Second.',
    } as const;
    const three = {
      id: 'three',
      text: 'Three',
      depth: 3,
      parent: two,
      content: 'Third.',
    } as const;
    const four = {
      id: 'four',
      text: 'Four',
      depth: 4,
      parent: three,
      content: 'Fourth.',
    } as const;
    const five = {
      id: 'five',
      text: 'Five',
      depth: 5,
      parent: four,
      content: 'Fifth.',
    } as const;
    const headings = await markdownToHeading(
      '# One {#one}\n\nFirst.\n\n## Two {#two}\n\nSecond.\n\n### Three {#three}\n\nThird.\n\n#### Four {#four}\n\nFourth.\n\n##### Five {#five}\n\nFifth.\n\n###### Six {#six}\n\nSixth.',
    );

    assert.deepEqual(headings, [
      { ...one, content: 'First.' },
      { ...two, content: 'Second.' },
      { ...three, content: 'Third.' },
      { ...four, content: 'Fourth.' },
      { ...five, content: 'Fifth.' },
      { id: 'six', text: 'Six', depth: 6, parent: five, content: 'Sixth.' },
    ]);
  });

  it('connects siblings to their direct parent and resets ancestry for a new H1', async () => {
    const headings = await markdownToHeading(
      '# Article {#article}\n\n## Installation {#installation}\n\n### Windows {#windows}\n\n#### Advanced {#advanced}\n\n### macOS {#macos}\n\n## FAQ {#faq}\n\n# Another article {#another-article}\n\n### Skipped depth {#skipped-depth}',
    );

    assert.isNull(headings[0].parent);
    assert.strictEqual(headings[1].parent?.id, 'article');
    assert.strictEqual(headings[2].parent?.id, 'installation');
    assert.strictEqual(headings[3].parent?.id, 'windows');
    assert.strictEqual(headings[4].parent, headings[2].parent);
    assert.strictEqual(headings[5].parent, headings[1].parent);
    assert.isNull(headings[6].parent);
    assert.strictEqual(headings[7].depth, 3);
    assert.strictEqual(headings[7].parent?.id, 'another-article');
  });

  it('uses the nearest lower-depth heading when depths are skipped', async () => {
    const headings = await markdownToHeading(
      '## Root {#root}\n\n##### Deep {#deep}\n\n### Shallow {#shallow}\n\n## Sibling {#sibling}',
    );

    assert.isNull(headings[0].parent);
    assert.strictEqual(headings[1].depth, 5);
    assert.strictEqual(headings[1].parent?.id, 'root');
    assert.strictEqual(headings[2].depth, 3);
    assert.strictEqual(headings[2].parent, headings[1].parent);
    assert.isNull(headings[3].parent);
  });

  it('keeps consecutive headings as separate sections with empty bodies', async () => {
    assert.deepEqual(
      await markdownToHeading('## First {#first}\n\n### Second {#second}'),
      [
        { id: 'first', text: 'First', depth: 2, parent: null, content: '' },
        {
          id: 'second',
          text: 'Second',
          depth: 3,
          parent: { id: 'first', text: 'First', depth: 2, parent: null, content: '' },
          content: '',
        },
      ],
    );
  });

  it('preserves explicit IDs for repeated headings without including ID syntax in text', async () => {
    const markdown =
      '## **Custom** {#한글 anchor}\n\nFirst.\n\n## Repeated {#repeated}\n\nSecond.\n\n## Repeated {#repeated-1}\n\nThird.';
    const headings = await markdownToHeading(markdown);
    const html = await markdownToHtml(markdown);

    assert.deepEqual(headings, [
      { id: '한글 anchor', text: 'Custom', depth: 2, parent: null, content: 'First.' },
      { id: 'repeated', text: 'Repeated', depth: 2, parent: null, content: 'Second.' },
      {
        id: 'repeated-1',
        text: 'Repeated',
        depth: 2,
        parent: null,
        content: 'Third.',
      },
    ]);
    assert.include(html, 'id="한글 anchor"');
    assert.include(html, 'id="repeated"');
    assert.include(html, 'id="repeated-1"');
  });

  it('extracts Setext headings and omits raw HTML blocks', async () => {
    assert.deepEqual(
      await markdownToHeading(
        'Setext {#setext}\n------\n\nFirst.\n\n<section><h3 id="raw-heading">Raw <em>heading</em></h3><p>Second.</p></section>',
      ),
      [{ id: 'setext', text: 'Setext', depth: 2, parent: null, content: 'First.' }],
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
        text: 'Article',
        depth: 1,
        parent: null,
        content:
          'Paragraph. First item Second item Image description Reference text nearby text.',
      },
    ]);
  });

  it('separates blocks and line breaks while preserving words across inline formatting', async () => {
    const headings = await markdownToHeading(
      'First\n\nSecond\n\ntool**tip** and <kbd>keyboard</kbd>.  \nNext.',
      { title: 'Article {#article}' },
    );

    assert.strictEqual(headings[0].content, 'First Second tooltip and keyboard. Next.');
  });

  it('separates nested Markdown blocks and keeps code, math, and table text', async () => {
    const headings = await markdownToHeading(
      '> Before\n>\n> - Inside\n>   - Nested\n\nAfter *inline*.\n\n```ts\nconst value = 1;\n```\n\n$$\nx + y\n$$\n\n| First | Second |\n| --- | --- |\n| Left | Right |',
      { title: 'Article {#article}' },
    );

    assert.strictEqual(
      headings[0].content,
      'Before Inside Nested After inline. const value = 1; x + y First Second Left Right',
    );
  });

  it('keeps heading text and image alt text out of its section body', async () => {
    const headings = await markdownToHeading(
      '## tool**tip** ![icon](icon.png) help {#tooltip}\n\nBody.',
    );

    assert.lengthOf(headings, 1);
    assert.strictEqual(headings[0].text, 'tooltip icon help');
    assert.strictEqual(headings[0].content, 'Body.');
  });

  it('omits HTML blocks without changing Markdown heading ancestry', async () => {
    const headings = await markdownToHeading(
      'Visible.\n\n<!-- commentsecret -->\n\n<script>scriptsecret</script>\n\n<style>stylesecret</style>\n\n<div hidden><h2>Hidden heading</h2>hiddensecret</div>\n\n<div aria-hidden="true">ariasecret</div>\n\n<div aria-hidden="false">Also visible.</div>\n\n### Visible heading {#visible-heading}\n\nBody.',
      { title: 'Article {#article}' },
    );

    assert.lengthOf(headings, 2);
    assert.strictEqual(headings[0].content, 'Visible.');
    assert.strictEqual(headings[1].parent?.id, 'article');
    assert.strictEqual(headings[1].content, 'Body.');
  });

  it('keeps Markdown text inside inline HTML without interpreting visibility', async () => {
    const headings = await markdownToHeading(
      '## Heading <span hidden>label</span> {#heading}\n\nText <span hidden>hidden</span> and <template>template</template>.',
    );

    assert.strictEqual(headings[0].text, 'Heading label');
    assert.strictEqual(headings[0].content, 'Text hidden and template.');
  });

  it('rejects missing custom IDs with the heading text and source line', async () => {
    await expect(markdownToHeading('Intro.\n\n## Missing')).rejects.toThrow(
      'Heading "Missing" at line 3 needs an explicit custom ID',
    );
  });

  it('rejects a supplied title without a custom ID', async () => {
    await expect(markdownToHeading('Body.', { title: 'Article' })).rejects.toThrow(
      'Heading "Article" at line 1 needs an explicit custom ID',
    );
  });

  it('rejects custom IDs inside formatted text', async () => {
    await expect(markdownToHeading('## **Formatted {#ignored}**')).rejects.toThrow(
      'needs an explicit custom ID',
    );
  });

  it('rejects custom IDs followed by trailing text', async () => {
    await expect(markdownToHeading('## Earlier {#ignored} trailing')).rejects.toThrow(
      'needs an explicit custom ID',
    );
  });

  it('rejects an empty custom ID', async () => {
    await expect(markdownToHeading('## Empty {#}')).rejects.toThrow(
      'needs an explicit custom ID',
    );
  });

  it('extracts headings inside blockquotes and ignores heading syntax in fenced code', async () => {
    const headings = await markdownToHeading(
      '# Article {#article}\n\n> ## Quoted {#quoted}\n>\n> Body.\n\n```md\n## Code {#code}\n```\n\n## Next {#next}',
    );

    assert.deepEqual(
      headings.map(section => section.id),
      ['article', 'quoted', 'next'],
    );
    assert.strictEqual(headings[1].parent?.id, 'article');
    assert.strictEqual(headings[1].content, 'Body. ## Code {#code}');
    assert.strictEqual(headings[2].content, '');
  });

  it('keeps parent metadata independent between conversions', async () => {
    const first = await markdownToHeading('# Repeated {#repeated}\n\n## Child {#child}');
    const second = await markdownToHeading('# Repeated {#repeated}\n\n## Child {#child}');

    assert.strictEqual(first[0].id, 'repeated');
    assert.strictEqual(second[0].id, 'repeated');
    assert.deepEqual(second, first);
    assert.notStrictEqual(second[1].parent, first[1].parent);
  });
});
