/**
 * @fileoverview Converts Markdown to search data with rendered heading anchors.
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

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MarkdownToSearchDataOptions {
  /**
   * Skip the H1 heading generated from the provided title in the search data.
   */
  title?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Extracts the introduction and each H1-H6 section using the rendered heading IDs.
 * Includes image alt text and inline text, and excludes comments and hidden content.
 */
export async function markdownToSearchData(
  markdown: string,
  options?: MarkdownToSearchDataOptions,
) {
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
  const sections = [{ heading: '', anchor: '', content: '' }];
  let section = sections[0];
  let skipTitle = Boolean(options?.title);

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
      section.content += node.value;
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
      if (skipTitle) {
        skipTitle = false;
        return;
      }
      section = {
        heading: text(node).trim(),
        anchor: String(node.properties.id ?? ''),
        content: '',
      };
      sections.push(section);
      return;
    }
    if (node.tagName === 'img') {
      section.content += ` ${text(node)} `;
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
    if (block) section.content += ' ';
    node.children.forEach(visit);
    if (block) section.content += ' ';
  }

  tree.children.forEach(visit);

  return sections.map(value => ({
    ...value,
    content: value.content.replace(/\s+/g, ' ').trim(),
  }));
}
