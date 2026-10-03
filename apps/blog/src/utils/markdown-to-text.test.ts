/**
 * @fileoverview Test for `markdown-to-text.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { markdownToText, markdownToTextSync } from './markdown-to-text.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-text', () => {
  it('should preserve plain text - 1', async () => {
    const markdown = '한글 유니코드(Unicode)';
    const text = '한글 유니코드(Unicode)';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should preserve plain text - 2', async () => {
    const markdown = "GitHub's classic branch protection rules";
    const text = "GitHub's classic branch protection rules";

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should preserve plain text - 3', async () => {
    const markdown =
      'Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상';
    const text =
      'Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should convert Markdown `inlineCode` syntax - 1', async () => {
    const markdown = 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`';
    const text = 'HTML에서 공백을 다루는 방법: &nbsp;, &ensp;, &emsp;';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should convert Markdown `inlineCode` syntax - 2', async () => {
    const markdown =
      '자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (`require` 및 `import`)';
    const text = '자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (require 및 import)';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should convert Markdown `inlineCode` syntax with HTML tags', async () => {
    const markdown = '`<b>` `<i>` ***Tag***와 `<strong>` `<em>` ***Tag***의 차이점';
    const text = '<b> <i> Tag와 <strong> <em> Tag의 차이점';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should convert Markdown `strong` and `emphasis` syntax', async () => {
    const markdown = '자바스크립트(***JavaScript***)의 구성';
    const text = '자바스크립트(JavaScript)의 구성';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should remove HTML `<sup>` tags', async () => {
    const markdown = '마크다운<sup>Markdown</sup>의 모든 것';
    const text = '마크다운Markdown의 모든 것';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should preserve text inside GFM strikethrough syntax', async () => {
    const markdown = 'Replace ~~old text~~ with new text';
    const text = 'Replace old text with new text';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should remove GFM task list markers', async () => {
    const markdown = '- [x] Completed task\n- [ ] Pending task';
    const text = 'Completed taskPending task';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should remove GFM tables and preserve surrounding text', async () => {
    const markdown = 'Before\n\n| Name |\n| --- |\n| Value |\n\nAfter';
    const text = 'BeforeAfter';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should preserve inline math content without dollar delimiters', async () => {
    const markdown = 'The formula is $a^2 - b^2 = (a - b)(a + b)$.';
    const text = 'The formula is a^2 - b^2 = (a - b)(a + b).';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });

  it('should preserve block math content without dollar delimiters', async () => {
    const markdown = '$$\n\\frac{a}{b}\n$$';
    const text = '\\frac{a}{b}';

    assert.strictEqual(await markdownToText(markdown), text);
    assert.strictEqual(markdownToTextSync(markdown), text);
  });
});
