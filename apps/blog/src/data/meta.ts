/**
 * @fileoverview Defines shared metadata types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { JSX } from 'react';
import type { LangRecord } from '@/data/lang';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents shared metadata with localized display names.
 */
export interface Meta {
  /**
   * The localized display name in English and Korean.
   */
  readonly name: LangRecord<string>;
}

/**
 * Represents metadata with an associated React icon.
 */
export interface MetaWithIcons extends Meta {
  /**
   * The React icon associated with the metadata item, represented as a JSX element.
   */
  readonly icons: JSX.Element;
}
