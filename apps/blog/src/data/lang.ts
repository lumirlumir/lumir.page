/**
 * @fileoverview Defines supported lang routing keys.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the supported lang key used in the route segment.
 */
export type LangKey = (typeof langKeys)[number];

/**
 * Represents the props that include a `lang` key for localized routes.
 */
export type PropsWithLang<P = unknown> = P & {
  /**
   * The `lang` key for the current route, used to determine the language of the content.
   */
  readonly lang: LangKey;
};

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Supported lang keys for localized routes.
 */
export const langKeys = ['ko', 'en'] as const;
