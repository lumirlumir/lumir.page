/**
 * @fileoverview Defines the helper functions for converting markdown content to HTML.
 * @see https://github.com/remarkjs/remark-gfm#readme (`remark-gfm`)
 * @see https://github.com/remarkjs/remark-github#readme (`remark-github`)
 * @see https://github.com/remarkjs/remark-math#readme (`remark-math`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/rehypejs/rehype-raw#readme (`rehype-raw`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/alert#rehype-github-alert (`rehype-github-alert`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/color#rehype-github-color (`rehype-github-color`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/emoji#rehype-github-emoji (`rehype-github-emoji`)
 * @see https://github.com/rehypejs/rehype-slug#rehype-slug (`rehype-slug`)
 * @see https://github.com/rehypejs/rehype-autolink-headings#rehype-autolink-headings (`rehype-autolink-headings`)
 * @see https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex#rehype-katex (`rehype-katex`)
 * @see https://github.com/rehypejs/rehype-starry-night (`rehype-starry-night`)
 * @see https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify#rehype-stringify (`rehype-stringify`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  rehypeCommentRemover,
  rehypeImageLazyLoading,
  rehypeImageUrlReplace,
} from '@lumir/rehype-plugins';
import { remarkCustomHeadingId, remarkHeadingFromTitle } from '@lumir/remark-plugins';
import remarkGfm from 'remark-gfm';
import remarkGitHub from 'remark-github';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeGitHubAlert from 'rehype-github-alert';
import rehypeGitHubColor from 'rehype-github-color';
import rehypeGitHubEmoji from 'rehype-github-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { GITHUB_REPO_FULL_NAME } from '@/constants';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MarkdownToHtmlOptions {
  /**
   * Prepend an H1 heading generated from the provided title.
   */
  title?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to HTML asynchronously using `unified` with `remark` and `rehype`.
 * @param markdown The markdown content to convert.
 * @param options Optional settings for the conversion process.
 * @example
 * ```ts
 * import { markdownToHtml } from '@/utils/markdown-to-html';
 *
 * const markdown = 'Foo Bar Baz';
 * const html = await markdownToHtml(markdown, { title: 'Awesome Title' });
 *
 * console.log(html);
 * // Output:
 * // <h1 id="awesome-title"><a aria-hidden="true" tabindex="-1" href="#awesome-title"><span class="icon-link"></span></a>Awesome Title</h1>
 * // <p>Foo Bar Baz</p>
 * ```
 */
export async function markdownToHtml(
  markdown: string,
  options?: MarkdownToHtmlOptions,
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkHeadingFromTitle, { title: options?.title })
    .use(remarkCustomHeadingId)
    .use(
      remarkGitHub, // Use after `remarkCustomHeadingId` to avoid converting issue/PR references syntax (e.g., `#1`) used in custom heading IDs into links by mistake.
      { repository: GITHUB_REPO_FULL_NAME },
    )
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeCommentRemover)
    .use(rehypeGitHubAlert)
    .use(rehypeGitHubColor)
    .use(rehypeGitHubEmoji)
    .use(rehypeSlug) // Use before `rehype-katex` to ensure heading IDs are generated correctly.
    .use(
      rehypeAutolinkHeadings, // Use before `rehype-katex` and after `rehype-slug` to ensure autolink anchors are generated correctly.
      {
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['icon-link'] },
          children: [],
        },
      },
    )
    .use(rehypeKatex)
    .use(rehypeStarryNight)
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/apps\/blog\/public/,
      replaceValue: '',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}

/**
 * Converts markdown content to HTML asynchronously using `unified` with `remark` and `rehype`, without any additional plugins or transformations.
 * @param markdown The markdown content to convert.
 * @example
 * ```ts
 * import { markdownToHtmlLite } from '@/utils/markdown-to-html';
 *
 * const markdown = 'Foo Bar Baz';
 * const html = await markdownToHtmlLite(markdown);
 *
 * console.log(html);
 * // Output:
 * // <p>Foo Bar Baz</p>
 * ```
 */
export async function markdownToHtmlLite(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
