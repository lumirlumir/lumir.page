/**
 * @fileoverview Defines the types and metadata for the frontmatter.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  FaBook,
  FaRegCalendarPlus,
  FaRegCalendarXmark,
  FaTag,
  LuHeading1,
} from '@lumir/react-kit/svgs';
import { type CategoryKey } from './category';
import { type Meta } from './meta';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the frontmatter of a Markdown document,
 * containing metadata such as `title`, `description`, `created` date, `updated` date, `categories`, and `references`.
 */
export interface Frontmatter {
  /**
   * The title of the Markdown document, providing a concise and descriptive name for the content.
   * - Markdown and HTML syntax are allowed in this field.
   */
  readonly title: string;

  /**
   * The description of the Markdown document, providing a brief summary or overview of its content.
   * - Markdown and HTML syntax are allowed in this field.
   */
  readonly description: string;

  /**
   * The created date of the Markdown document, indicating when the document was initially created or published.
   */
  readonly created: string;

  /**
   * The updated date of the Markdown document, indicating when the document was last modified or updated.
   */
  readonly updated: string;

  /**
   * The categories of the Markdown document, representing the categories associated with the content.
   */
  readonly categories: CategoryKey[];

  /**
   * The reference URLs of the Markdown document.
   */
  readonly references: string[];
}

/**
 * Represents the key of the frontmatter defined in the `frontmatterMeta` object.
 */
export type FrontmatterKey = (typeof frontmatterKeys)[number];

/**
 * Represents the keys of the frontmatter that can be sorted, excluding `description` and `categories` which are not typically used for sorting.
 */
export type SortableFrontmatterKey = Exclude<
  FrontmatterKey,
  'description' | 'categories' | 'references'
>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const frontmatterKeys = [
  'title',
  'description',
  'created',
  'updated',
  'categories',
  'references',
] as const satisfies readonly (keyof Frontmatter)[];

/**
 * An object containing metadata for the frontmatter fields,
 * including their names in English and Korean, as well as associated React icons.
 */
export const frontmatterMeta = {
  title: {
    name: {
      en: 'Title',
      ko: '제목',
    },
    reactIcons: <LuHeading1 />,
  },
  description: {
    name: {
      en: 'Description',
      ko: '설명',
    },
    reactIcons: <FaBook />,
  },
  created: {
    name: {
      en: 'Created Date',
      ko: '생성한 날짜',
    },
    reactIcons: <FaRegCalendarPlus />,
  },
  updated: {
    name: {
      en: 'Updated Date',
      ko: '수정한 날짜',
    },
    reactIcons: <FaRegCalendarXmark />,
  },
  categories: {
    name: {
      en: 'Categories',
      ko: '카테고리',
    },
    reactIcons: <FaTag />,
  },
  references: {
    name: {
      en: 'References',
      ko: '참고 링크',
    },
    reactIcons: <span aria-hidden="true" />, // Currently, there is no suitable icon for references, so we use an inline placeholder.
  },
} as const satisfies Record<FrontmatterKey, Meta>;
