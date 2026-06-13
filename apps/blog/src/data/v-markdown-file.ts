/**
 * @fileoverview Defines the structure of a virtual Markdown file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Frontmatter } from '@/data/frontmatter';
import { type LangKey } from '@/data/lang';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents the metadata of a Virtual Markdown file, containing the `slug` (excluding extension) and `data` (frontmatter) of the Markdown document.
 */
export interface VMarkdownFileMeta {
  /**
   * The slug of the Markdown file, excluding the leading directory path and extension (e.g., `example` for `./example.md`).
   */
  readonly slug: string;

  /**
   * The language key of the Markdown file, representing the language of the content (e.g., `ko` for Korean, `en` for English).
   */
  readonly lang: LangKey;

  /**
   * The data of the Markdown file, representing the frontmatter metadata defined in the `Frontmatter` interface.
   */
  readonly data: Frontmatter;
}

/**
 * Represents a Virtual Markdown file, containing the `slug` (excluding extension), `data` (frontmatter), and `content` of the Markdown document.
 */
export interface VMarkdownFile extends VMarkdownFileMeta {
  /**
   * The content of the Markdown file, representing the raw Markdown text.
   */
  readonly content: string;
}
