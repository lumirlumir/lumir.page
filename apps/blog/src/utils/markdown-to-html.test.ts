/**
 * @fileoverview Test for `markdown-to-html.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { markdownToHtml, markdownToHtmlLite } from './markdown-to-html.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-html', () => {
  describe('Markdown', () => {
    it('should convert plain text - 1', async () => {
      const markdown = '한글 유니코드(Unicode)';
      const html = '<p>한글 유니코드(Unicode)</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert plain text - 2', async () => {
      const markdown = "GitHub's classic branch protection rules";
      const html = "<p>GitHub's classic branch protection rules</p>";

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert plain text - 3', async () => {
      const markdown =
        'Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상';
      const html =
        '<p>Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax - 1', async () => {
      const markdown = 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`';
      const html =
        '<p>HTML에서 공백을 다루는 방법: <code>&#x26;nbsp;</code>, <code>&#x26;ensp;</code>, <code>&#x26;emsp;</code></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax - 2', async () => {
      const markdown =
        '자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (`require` 및 `import`)';
      const html =
        '<p>자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (<code>require</code> 및 <code>import</code>)</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax with HTML tags', async () => {
      const markdown = '`<b>` `<i>` ***Tag***와 `<strong>` `<em>` ***Tag***의 차이점';
      const html =
        '<p><code>&#x3C;b></code> <code>&#x3C;i></code> <em><strong>Tag</strong></em>와 <code>&#x3C;strong></code> <code>&#x3C;em></code> <em><strong>Tag</strong></em>의 차이점</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert Markdown `strong` and `emphasis` syntax', async () => {
      const markdown = '자바스크립트(***JavaScript***)의 구성';
      const html = '<p>자바스크립트(<em><strong>JavaScript</strong></em>)의 구성</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert Markdown `delete` syntax - 1', async () => {
      const markdown = '~~Foo Bar Baz~~';
      const html = '<p><del>Foo Bar Baz</del></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown `delete` syntax - 2', async () => {
      const markdown = '~Foo Bar Baz~';
      const html = '<p><del>Foo Bar Baz</del></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown auto-link syntax', async () => {
      const markdown = 'https://example.com';
      const html = '<p><a href="https://example.com">https://example.com</a></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown task list syntax', async () => {
      const markdown = '- [x] Task 1\n- [ ] Task 2';
      const html =
        '<ul class="contains-task-list">\n<li class="task-list-item"><input type="checkbox" checked disabled> Task 1</li>\n<li class="task-list-item"><input type="checkbox" disabled> Task 2</li>\n</ul>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert GitHub `@mention` syntax', async () => {
      const markdown = 'Hello @octocat';
      const html =
        '<p>Hello <a href="https://github.com/octocat"><strong>@octocat</strong></a></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Math syntax', async () => {
      const markdown = '$a^2 - b^2 = (a - b)(a + b)$';
      const html =
        '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>−</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><mo stretchy="false">(</mo><mi>a</mi><mo>−</mo><mi>b</mi><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">a^2 - b^2 = (a - b)(a + b)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">b</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">b</span><span class="mclose">)</span></span></span></span></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should add an H1 heading when `title` option is provided', async () => {
      const markdown = 'Foo Bar Baz';
      const html = '<h1 id="awesome-title">Awesome Title</h1>\n<p>Foo Bar Baz</p>';

      assert.strictEqual(
        await markdownToHtml(markdown, { title: 'Awesome Title' }),
        html,
      );
    });
  });

  describe('HTML', () => {
    it('should preserve HTML `<sup>` tags', async () => {
      const markdown = '마크다운<sup>Markdown</sup>의 모든 것';
      const html = '<p>마크다운<sup>Markdown</sup>의 모든 것</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
      assert.strictEqual(await markdownToHtmlLite(markdown), html);
    });

    it('should convert GitHub Alert syntax to GitHub Alert HTML', async () => {
      const markdown = '> [!NOTE]\n> This is a note.';
      const html =
        '<div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>This is a note.</p>\n</div>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert GitHub Color syntax to GitHub Color HTML', async () => {
      const markdown = '`#ff0000`';
      const html =
        '<p><code>#ff0000<span class="ml-1 d-inline-block border circle color-border-subtle" style="background-color: #ff0000; height: 8px; width: 8px;"></span></code></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert `:+1:` emoji syntax to GitHub emoji', async () => {
      const markdown = 'I love this! :+1:';
      const html = '<p>I love this! 👍</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should add GitHub-style IDs to Markdown headings', async () => {
      const markdown = '# Awesome Title\n\n## Usage Guide';
      const html =
        '<h1 id="awesome-title">Awesome Title</h1>\n<h2 id="usage-guide">Usage Guide</h2>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should add unique GitHub-style IDs to duplicate Markdown headings', async () => {
      const markdown = '# Repeat\n\n# Repeat';
      const html = '<h1 id="repeat">Repeat</h1>\n<h1 id="repeat-1">Repeat</h1>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should add GitHub-style IDs to raw HTML headings', async () => {
      const markdown = '<h2>Raw HTML Heading</h2>';
      const html = '<h2 id="raw-html-heading">Raw HTML Heading</h2>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should generate heading IDs before rendering math with KaTeX', async () => {
      const markdown = '# Area $A$';
      const html = await markdownToHtml(markdown);

      assert.include(html, '<h1 id="area-a">Area <span class="katex">');
      assert.notInclude(html, 'id="area-aaa"');
    });

    it('should add `loading="lazy"` to `<img>` tags', async () => {
      const markdown = '![alt](https://example.com/image.png)';
      const html =
        '<p><img src="https://example.com/image.png" alt="alt" loading="lazy"></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should replace image URLs starting with `/apps/blog/public` - 1', async () => {
      const markdown = '![alt](/apps/blog/public/image.png)';
      const html = '<p><img src="/image.png" alt="alt" loading="lazy"></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should replace image URLs starting with `/apps/blog/public` - 2', async () => {
      const markdown =
        '<img src="/apps/blog/public/images/posts/everything-about-markdown/1.webp?raw=true" width="450px" height="300px" title="px(픽셀) 크기 설정" alt="RubberDuck"></img>';
      const html =
        '<p><img src="/images/posts/everything-about-markdown/1.webp?raw=true" width="450px" height="300px" title="px(픽셀) 크기 설정" alt="RubberDuck" loading="lazy"></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert code blocks with syntax highlighting - 1', async () => {
      const markdown = '```js\nconsole.log("Hello, world!");\n```';
      const html =
        '<pre><code class="language-js"><span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">"</span>Hello, world!<span class="pl-pds">"</span></span>);\n</code></pre>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert code blocks with syntax highlighting - 2', async () => {
      const markdown = '```md\n# Heading\n```';
      const html =
        '<pre><code class="language-md"><span class="pl-mh"># <span class="pl-en">Heading</span></span>\n</code></pre>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });
  });
});
