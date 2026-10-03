/**
 * @fileoverview Extracts Markdown headings, section text, and parent relationships.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeCommentRemover } from '@lumir/rehype-plugins';
import { remarkCustomHeadingId, remarkHeadingFromTitle } from '@lumir/remark-plugins';
import remarkGfm from 'remark-gfm';
import remarkGitHub from 'remark-github';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeGitHubAlert from 'rehype-github-alert';
import rehypeGitHubColor, { defaultBuild } from 'rehype-github-color';
import rehypeGitHubEmoji from 'rehype-github-emoji';
import rehypeSlug from 'rehype-slug';
import { unified } from 'unified';
import { githubRepoFullName } from '@/data/site';
import { type VMarkdownHeading, type VMarkdownHeadingMeta } from '@/data/v-markdown';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MarkdownToHeadingOptions {
  /**
   * Prepend an H1 heading generated from the provided title.
   * Introductory body text becomes the content of this heading.
   */
  title?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Extracts each H1-H6 heading with its rendered ID, level, direct parent, and section text.
 * Keeps the H1 generated from `options.title`, including its introductory body text.
 * Without a title, text before the first heading is omitted; documents without headings return an empty array.
 * Includes image alt text and inline text, and excludes comments and hidden content.
 * @param markdown The Markdown body to process.
 * @param options Optional title used to generate an H1 heading.
 */
export async function markdownToHeading(
  markdown: string,
  options?: MarkdownToHeadingOptions,
): Promise<VMarkdownHeading[]> {
  // Keep text transformations and heading IDs aligned with `markdownToHtml`.
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkHeadingFromTitle, { title: options?.title })
    .use(remarkCustomHeadingId)
    .use(
      remarkGitHub, // Keep custom heading IDs from becoming issue links.
      { repository: githubRepoFullName },
    )
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeCommentRemover)
    .use(rehypeGitHubAlert)
    .use(rehypeGitHubColor, {
      build: value => {
        const node = defaultBuild(value);

        if (node.type === 'element') {
          node.properties.className = ['rehype-github-color'];
        }

        return node;
      },
    })
    .use(rehypeGitHubEmoji)
    .use(rehypeSlug);
  const tree = await processor.run(processor.parse(markdown));
  const headings: VMarkdownHeading[] = [];
  const stack: VMarkdownHeadingMeta[] = [];
  let heading: VMarkdownHeadingMeta | undefined;
  let content = '';

  function finishHeading() {
    if (heading) {
      headings.push({ ...heading, content: content.replace(/\s+/g, ' ').trim() });
    }

    content = '';
  }

  function text(node: (typeof tree.children)[number]): string {
    if (node.type === 'text') return node.value;
    if (node.type !== 'element') return '';
    if (
      ['script', 'style', 'template'].includes(node.tagName) ||
      node.properties.hidden ||
      node.properties.ariaHidden === 'true'
    )
      return '';
    if (node.tagName === 'img') return String(node.properties.alt ?? '');
    if (node.tagName === 'br') return ' ';

    return node.children.map(text).join('');
  }

  function visit(node: (typeof tree.children)[number]) {
    if (node.type === 'text') {
      if (heading) content += node.value;
      return;
    }
    if (node.type !== 'element') return;
    if (
      ['script', 'style', 'template'].includes(node.tagName) ||
      node.properties.hidden ||
      node.properties.ariaHidden === 'true'
    )
      return;
    if (/^h[1-6]$/.test(node.tagName)) {
      finishHeading();
      const level = Number(node.tagName[1]) as VMarkdownHeadingMeta['level'];

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      heading = {
        heading: text(node).trim(),
        id: String(node.properties.id ?? ''),
        level,
        parent: stack.at(-1) ?? null,
      };
      stack.push(heading);
      return;
    }
    if (node.tagName === 'img') {
      if (heading) content += ` ${text(node)} `;
      return;
    }
    const block = ![
      'a',
      'em',
      'strong',
      'span',
      'code',
      'sup',
      'sub',
      'kbd',
      'del',
    ].includes(node.tagName);
    if (block && heading) content += ' ';
    node.children.forEach(visit);
    if (block && heading) content += ' ';
  }

  tree.children.forEach(visit);
  finishHeading();

  return headings;
}
