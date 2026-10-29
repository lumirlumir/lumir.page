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
        content: '제목과 설명에 없는 툴팁 본문입니다.',
      },
    ]);
  });

  it('keeps the generated title as an empty H1 when the body is empty', async () => {
    assert.deepEqual(await markdownToHeading('', { title: 'Article {#article}' }), [
      { id: 'article', text: 'Article', depth: 1, content: '' },
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
        content: 'Intro.',
      },
      {
        id: 'first-section',
        text: 'First section',
        depth: 2,
        content: 'Body.',
      },
    ]);
  });

  it('omits text before the first body heading when no title is provided', async () => {
    assert.deepEqual(
      await markdownToHeading('Intro.\n\n## Section {#section}\n\nBody.'),
      [{ id: 'section', text: 'Section', depth: 2, content: 'Body.' }],
    );
  });

  it('extracts all six depths as flat sections with separate bodies', async () => {
    const one = {
      id: 'one',
      text: 'One',
      depth: 1,
      content: 'First.',
    } as const;
    const two = {
      id: 'two',
      text: 'Two',
      depth: 2,
      content: 'Second.',
    } as const;
    const three = {
      id: 'three',
      text: 'Three',
      depth: 3,
      content: 'Third.',
    } as const;
    const four = {
      id: 'four',
      text: 'Four',
      depth: 4,
      content: 'Fourth.',
    } as const;
    const five = {
      id: 'five',
      text: 'Five',
      depth: 5,
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
      { id: 'six', text: 'Six', depth: 6, content: 'Sixth.' },
    ]);
  });

  it('preserves document order across nested headings, siblings, and a new H1', async () => {
    const headings = await markdownToHeading(
      '# Article {#article}\n\n## Installation {#installation}\n\n### Windows {#windows}\n\n#### Advanced {#advanced}\n\n### macOS {#macos}\n\n## FAQ {#faq}\n\n# Another article {#another-article}\n\n### Skipped depth {#skipped-depth}',
    );

    assert.deepEqual(headings, [
      { id: 'article', text: 'Article', depth: 1, content: '' },
      { id: 'installation', text: 'Installation', depth: 2, content: '' },
      { id: 'windows', text: 'Windows', depth: 3, content: '' },
      { id: 'advanced', text: 'Advanced', depth: 4, content: '' },
      { id: 'macos', text: 'macOS', depth: 3, content: '' },
      { id: 'faq', text: 'FAQ', depth: 2, content: '' },
      { id: 'another-article', text: 'Another article', depth: 1, content: '' },
      { id: 'skipped-depth', text: 'Skipped depth', depth: 3, content: '' },
    ]);
  });

  it('keeps section bodies separate when heading depths are skipped or decrease', async () => {
    const headings = await markdownToHeading(
      '## Root {#root}\n\nRoot body.\n\n##### Deep {#deep}\n\nDeep body.\n\n### Shallow {#shallow}\n\nShallow body.\n\n## Sibling {#sibling}\n\nSibling body.',
    );

    assert.deepEqual(headings, [
      { id: 'root', text: 'Root', depth: 2, content: 'Root body.' },
      { id: 'deep', text: 'Deep', depth: 5, content: 'Deep body.' },
      { id: 'shallow', text: 'Shallow', depth: 3, content: 'Shallow body.' },
      { id: 'sibling', text: 'Sibling', depth: 2, content: 'Sibling body.' },
    ]);
  });

  it('keeps consecutive headings as separate sections with empty bodies', async () => {
    assert.deepEqual(
      await markdownToHeading('## First {#first}\n\n### Second {#second}'),
      [
        { id: 'first', text: 'First', depth: 2, content: '' },
        {
          id: 'second',
          text: 'Second',
          depth: 3,
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
      { id: '한글 anchor', text: 'Custom', depth: 2, content: 'First.' },
      { id: 'repeated', text: 'Repeated', depth: 2, content: 'Second.' },
      {
        id: 'repeated-1',
        text: 'Repeated',
        depth: 2,
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
      [{ id: 'setext', text: 'Setext', depth: 2, content: 'First.' }],
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
        content:
          'Paragraph. First item Second item Image description Reference text nearby text.',
      },
    ]);
  });

  it('preserves hard breaks as newlines while separating blocks and joining inline text', async () => {
    const headings = await markdownToHeading(
      'First\n\nSecond\n\ntool**tip** and <kbd>keyboard</kbd>.  \nNext.\\\nLast.',
      { title: 'Article {#article}' },
    );

    assert.strictEqual(
      headings[0].content,
      'First Second tooltip and keyboard.\nNext.\nLast.',
    );
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

  it('omits HTML blocks without changing Markdown heading order or depth', async () => {
    const headings = await markdownToHeading(
      'Visible.\n\n<!-- commentsecret -->\n\n<script>scriptsecret</script>\n\n<style>stylesecret</style>\n\n<div hidden><h2>Hidden heading</h2>hiddensecret</div>\n\n<div aria-hidden="true">ariasecret</div>\n\n<div aria-hidden="false">Also visible.</div>\n\n### Visible heading {#visible-heading}\n\nBody.',
      { title: 'Article {#article}' },
    );

    assert.lengthOf(headings, 2);
    assert.strictEqual(headings[0].content, 'Visible.');
    assert.strictEqual(headings[1].id, 'visible-heading');
    assert.strictEqual(headings[1].depth, 3);
    assert.strictEqual(headings[1].content, 'Body.');
  });

  it('preserves reference image alt text in headings and section bodies', async () => {
    const headings = await markdownToHeading(
      '## ![Heading icon][image] Help {#help}\n\n![Body description][image]\n\n[image]: icon.png "Image title"',
    );

    assert.deepEqual(headings, [
      {
        id: 'help',
        text: 'Heading icon Help',
        depth: 2,
        content: 'Body description',
      },
    ]);
  });

  it('omits image titles when heading and body images have empty alt text', async () => {
    const headings = await markdownToHeading(
      '## ![](icon.png "Hidden heading title") Help {#help}\n\n![][image]\n\n[image]: icon.png "Hidden body title"',
    );

    assert.deepEqual(headings, [{ id: 'help', text: 'Help', depth: 2, content: '' }]);
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
    assert.strictEqual(headings[1].depth, 2);
    assert.strictEqual(headings[1].content, 'Body. ## Code {#code}');
    assert.strictEqual(headings[2].content, '');
  });

  it('keeps heading objects independent between conversions', async () => {
    const first = await markdownToHeading('# Repeated {#repeated}\n\n## Child {#child}');
    const second = await markdownToHeading('# Repeated {#repeated}\n\n## Child {#child}');

    assert.strictEqual(first[0].id, 'repeated');
    assert.strictEqual(second[0].id, 'repeated');
    assert.deepEqual(second, first);
    assert.notStrictEqual(second[0], first[0]);
    assert.notStrictEqual(second[1], first[1]);
  });
});
