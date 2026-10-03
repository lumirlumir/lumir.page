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
 * Represents the raw Markdown content.
 */
export interface VMarkdownContent {
  /**
   * The content of the Markdown file, representing the raw Markdown text.
   */
  readonly content: string;
}

/**
 * Represents a virtual Markdown file's identity, language, reading time, and frontmatter metadata.
 */
export interface VMarkdownFileMeta {
  /**
   * The filename-based unique identifier of the Markdown file,
   * combining the slug and language key (e.g., `example.ko` for `./example.ko.md`).
   */
  readonly id: `${VMarkdownFileMeta['slug']}.${VMarkdownFileMeta['lang']}`;

  /**
   * The slug of the Markdown file, excluding the leading directory path, language key, and extension (e.g., `example` for `./example.ko.md`).
   */
  readonly slug: string;

  /**
   * The language key of the Markdown file, representing the language of the content (e.g., `ko` for Korean, `en` for English).
   */
  readonly lang: LangKey;

  /**
   * Estimated reading time of the Markdown body in display minutes, excluding frontmatter.
   */
  readonly readtime: number;

  /**
   * The data of the Markdown file, representing the frontmatter metadata defined in the `Frontmatter` interface.
   */
  readonly data: Frontmatter;
}

/**
 * Represents a virtual Markdown file with its metadata and raw Markdown body, excluding frontmatter.
 */
export interface VMarkdownFile extends VMarkdownContent, VMarkdownFileMeta {}

/**
 * Represents a heading's rendered anchor, visible text, level, and direct parent heading.
 */
export interface VMarkdownHeadingMeta {
  /**
   * The rendered HTML heading ID used as a deep-link anchor, excluding the leading `#`.
   * URL encoding is applied when constructing the link, rather than stored in this value.
   */
  readonly id: string;

  /**
   * The visible heading text, with Markdown formatting and HTML tags removed.
   */
  readonly heading: string;

  /**
   * The heading level corresponding to an HTML `h1` through `h6` element.
   * This preserves the source heading level even when intermediate levels are skipped.
   */
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The nearest preceding heading with a lower level, or `null` for a top-level heading.
   * Following `parent` recursively yields the ancestor headings from the direct parent outward.
   */
  readonly parent: VMarkdownHeadingMeta | null;
}

/**
 * Represents a heading section with its metadata and extracted plain-text body for search.
 * The body extends from the heading to the next heading in document order, excluding heading text.
 * Introductory body text before the first heading is handled separately from these heading records
 * and from the frontmatter `description`.
 */
export interface VMarkdownHeading extends VMarkdownContent, VMarkdownHeadingMeta {}
