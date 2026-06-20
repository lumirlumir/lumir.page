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
 * Represents a readonly record keyed by every supported language.
 * @template T The value type for each language entry. Defaults to `string`.
 */
export type LangRecord<T = string> = Readonly<Record<LangKey, T>>;

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
 * The default language key used in the route segment.
 */
export const langDefault = 'ko' as const satisfies LangKey;

/**
 * Supported lang keys for localized routes.
 */
export const langKeys = ['ko', 'en'] as const;
