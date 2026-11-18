/**
 * @fileoverview rehype-localize-github-alert-title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Root } from 'hast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `rehypeLocalizeGitHubAlertTitle` plugin.
 */
export interface RehypeLocalizeGitHubAlertTitleOptions {
  /**
   * The localized title for a `[!NOTE]` alert.
   */
  readonly Note: string;

  /**
   * The localized title for a `[!TIP]` alert.
   */
  readonly Tip: string;

  /**
   * The localized title for an `[!IMPORTANT]` alert.
   */
  readonly Important: string;

  /**
   * The localized title for a `[!WARNING]` alert.
   */
  readonly Warning: string;

  /**
   * The localized title for a `[!CAUTION]` alert.
   */
  readonly Caution: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A rehype plugin to localize GitHub alert titles in HTML content.
 * Register this plugin immediately after `rehype-github-alert` in the rehype pipeline.
 * @example
 *
 * ```ts
 * import { unified } from 'unified';
 * import rehypeParse from 'rehype-parse';
 * import rehypeGitHubAlert from 'rehype-github-alert';
 * import rehypeStringify from 'rehype-stringify';
 * import { rehypeLocalizeGitHubAlertTitle } from '@lumir/rehype-plugins';
 *
 * const file = await unified()
 *   .use(rehypeParse, { fragment: true })
 *   .use(rehypeGitHubAlert)
 *   .use(rehypeLocalizeGitHubAlertTitle, {
 *     Note: '참고',
 *     Tip: '팁',
 *     Important: '중요',
 *     Warning: '경고',
 *     Caution: '주의',
 *   })
 *   .use(rehypeStringify)
 *   .process('<blockquote><p>[!WARNING]\nSave your work.</p></blockquote>');
 *
 * console.log(String(file).includes('경고</p>')); // Output: true
 * ```
 */
export function rehypeLocalizeGitHubAlertTitle(
  options: RehypeLocalizeGitHubAlertTitleOptions,
) {
  const translations = new Map<string, string>(Object.entries(options));

  return (tree: Root) => {
    // rehype-github-alert creates top-level divs without a source position.
    for (const node of tree.children) {
      if (node.type !== 'element' || node.tagName !== 'div' || node.position) {
        continue;
      }

      const title = node.children[0];
      if (title?.type !== 'element') {
        continue;
      }

      const { className } = title.properties;
      if (!Array.isArray(className) || !className.includes('markdown-alert-title')) {
        continue;
      }

      const label = title.children.find(child => child.type === 'text');
      if (label) {
        label.value = translations.get(label.value) ?? label.value;
      }
    }
  };
}
