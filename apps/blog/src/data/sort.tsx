/**
 * @fileoverview Defines the types and metadata for the sort.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { FaArrowDownWideShort, FaArrowUpShortWide, GrSort } from '@lumir/react-kit/svgs';
import type { MetaWithIcons } from './meta';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the key of the sort defined in the `sortMeta` object.
 */
export type SortKey = (typeof sortKeys)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const sortKeyDefault = 'desc' as const satisfies SortKey;

export const sortKeys = ['asc', 'desc'] as const;

/**
 * Metadata for the sort menu.
 */
export const sortMenuMeta = {
  name: {
    en: 'Sort',
    ko: '정렬',
  },
  icons: <GrSort />,
} as const satisfies MetaWithIcons;

/**
 * An object containing metadata for the sort fields,
 * including their names in English and Korean, as well as associated React icons.
 */
export const sortMeta = {
  asc: {
    name: {
      en: 'Asc',
      ko: '오름차순',
    },
    icons: <FaArrowUpShortWide />,
  },
  desc: {
    name: {
      en: 'Desc',
      ko: '내림차순',
    },
    icons: <FaArrowDownWideShort />,
  },
} as const satisfies Record<SortKey, MetaWithIcons>;
