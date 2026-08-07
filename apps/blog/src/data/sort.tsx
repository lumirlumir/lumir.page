/**
 * @fileoverview Defines the types and metadata for the sort.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { FaArrowDownWideShort, FaArrowUpShortWide } from '@lumir/react-kit/svgs';
import { type Meta } from './meta';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the key of the sort defined in the `sortMeta` object.
 */
export type SortKey = keyof typeof sortMeta;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

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
    reactIcons: <FaArrowUpShortWide />,
  },
  desc: {
    name: {
      en: 'Desc',
      ko: '내림차순',
    },
    reactIcons: <FaArrowDownWideShort />,
  },
} as const satisfies Record<string, Meta>;
