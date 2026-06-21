/**
 * @fileoverview Defines a structured collection of Markdown files.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter, frontmatterData } from '@lumir/utils';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type Frontmatter } from '@/data/frontmatter';
import { langKeys, type LangKey, type LangRecord } from '@/data/lang';
import { type VMarkdownFileMeta, type VMarkdownFile } from '@/data/v-markdown-file';
import { isFrontmatter } from '@/utils/is-frontmatter';
import { modules } from '@/utils/markdown-modules';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type MarkdownCollectionMap = Map<VMarkdownFileMeta['id'], VMarkdownFileMeta>;
type MarkdownCollectionByLangSlug = LangRecord<
  Record<VMarkdownFileMeta['slug'], VMarkdownFileMeta>
>;
type MarkdownCollectionByLangCategory = LangRecord<
  Record<CategoryKey, VMarkdownFileMeta[]>
>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Regex to validate the `id` of a Markdown file, which should follow the format `{slug}.{lang}`.
 */
const idRegex = new RegExp(`^(?<slug>[a-z0-9-]+)\\.(?<lang>${langKeys.join('|')})$`);

/**
 * Asserts that the provided id conforms to the expected format.
 */
function assertId(id: unknown): Pick<VMarkdownFileMeta, 'id' | 'slug' | 'lang'> {
  const match = idRegex.exec(String(id));

  if (!match || !match.groups) {
    throw new Error(
      `
Invalid id in Markdown file.

Expected id format: \`{slug}.{lang}\`
  - slug: a string of lowercase letters, numbers, and hyphens (e.g., "example-post")
  - lang: one of the following language keys: ${langKeys.join(', ')}

Received id: \`${String(id)}\`
`,
    );
  }

  const slug = match.groups.slug satisfies string;
  const lang = match.groups.lang as LangKey;

  return {
    id: `${slug}.${lang}`,
    slug,
    lang,
  };
}

/**
 * Asserts that the provided data conforms to the expected `Frontmatter` structure.
 */
function assertFrontmatter(data: unknown, id: VMarkdownFileMeta['id']): Frontmatter {
  if (isFrontmatter(data)) {
    return data;
  }

  throw new Error(
    `
Invalid frontmatter in Markdown file.

Expected frontmatter format:
  - \`title: string\`
  - \`description: string\`
  - \`created: string\`
  - \`updated: string\`
  - \`categories: CategoryKey[]\`
  - \`references: string[]\`

Received id: \`${id}\`
Received data: \`${JSON.stringify(data, null, 2)}\`
`,
  );
}

// --------------------------------------------------------------------------------
// Class
// --------------------------------------------------------------------------------

/**
 * A class that represents a collection of Markdown files.
 */
class MarkdownCollection {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  /** Source of truth: used as a cache */
  #map: MarkdownCollectionMap = new Map();
  /** View: using `#map` as source of truth */
  #byLangSlug: MarkdownCollectionByLangSlug | null = null;
  /** View: using `#map` as source of truth */
  #byLangCategory: MarkdownCollectionByLangCategory | null = null;

  // ------------------------------------------------------------------------------
  // Private Method
  // ------------------------------------------------------------------------------

  /**
   * Lazily loads and processes Markdown files from the import registry, extracting their frontmatter.
   *
   * Performance Optimization:
   * - The method uses lazy loading to defer the loading and processing of Markdown files until they are actually needed.
   *   This can improve the initial load time of the application, especially if there are many Markdown files.
   * - Once the Markdown files are loaded and processed, they are cached in the `#map` property.
   *   Subsequent calls to this method will return the cached data, avoiding redundant processing.
   */
  #ensureMap(): MarkdownCollectionMap {
    for (const [key, markdown] of Object.entries(modules)) {
      const id = key.replace(/^\.\.\/posts\/docs\//, '').replace(/\.md$/, '');
      const { id: sanitizedId, slug: sanitizedSlug, lang: sanitizedLang } = assertId(id);

      // If the Markdown file has already been processed and cached, skip the loading and processing steps.
      const cached = this.#map.get(sanitizedId);

      if (cached) {
        continue;
      }

      // If the Markdown file has not been processed, load and process it, then cache the result.
      const { data } = frontmatterData(markdown);
      const sanitizedData = assertFrontmatter(data, sanitizedId);

      this.#map.set(sanitizedId, {
        id: sanitizedId,
        slug: sanitizedSlug,
        lang: sanitizedLang,
        data: sanitizedData,
      });
    }

    return this.#map;
  }

  /**
   * Lazily creates a mapping of language keys to slugs and their corresponding Markdown file metadata.
   */
  #ensureByLangSlug(): MarkdownCollectionByLangSlug {
    // If the slug mapping has already been created, skip the creation process.
    if (this.#byLangSlug) {
      return this.#byLangSlug;
    }

    const markdownCollectionByLangSlug = Object.fromEntries(
      langKeys.map(lang => [lang, {} as MarkdownCollectionByLangSlug[LangKey]]),
    ) as MarkdownCollectionByLangSlug;

    this.#ensureMap().forEach(vMarkdownFileMeta => {
      markdownCollectionByLangSlug[vMarkdownFileMeta.lang][vMarkdownFileMeta.slug] =
        vMarkdownFileMeta;
    });

    this.#byLangSlug = markdownCollectionByLangSlug;

    return markdownCollectionByLangSlug;
  }

  /**
   * Lazily creates a mapping of language keys to category keys and their corresponding Markdown file metadata arrays.
   */
  #ensureByLangCategory(): MarkdownCollectionByLangCategory {
    // If the category mapping has already been created, skip the creation process.
    if (this.#byLangCategory) {
      return this.#byLangCategory;
    }

    const markdownCollectionByLangCategory = Object.fromEntries(
      langKeys.map(lang => [
        lang,
        Object.fromEntries(
          categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFileMeta[]]),
        ) as MarkdownCollectionByLangCategory[LangKey],
      ]),
    ) as MarkdownCollectionByLangCategory;

    this.#ensureMap().forEach(vMarkdownFileMeta => {
      vMarkdownFileMeta.data.categories.forEach(category => {
        markdownCollectionByLangCategory[vMarkdownFileMeta.lang][category].push(
          vMarkdownFileMeta,
        );
      });
    });

    this.#byLangCategory = markdownCollectionByLangCategory;

    return markdownCollectionByLangCategory;
  }

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /**
   * Asynchronously loads the metadata of a Markdown file by its id, without loading its content.
   */
  async loadVMarkdownFileMeta(id: VMarkdownFileMeta['id']): Promise<VMarkdownFileMeta> {
    const cached = this.#map.get(id);

    if (cached) {
      return cached;
    }

    const { id: sanitizedId, slug: sanitizedSlug, lang: sanitizedLang } = assertId(id);
    const key = `../posts/docs/${sanitizedId}.md` as keyof typeof modules;

    if (!(key in modules)) {
      throw new Error(`Markdown file not found: \`${sanitizedId}\``);
    }

    const { data } = frontmatterData(modules[key]);
    const sanitizedData = assertFrontmatter(data, sanitizedId);

    const vMarkdownFileMeta: VMarkdownFileMeta = {
      id: sanitizedId,
      slug: sanitizedSlug,
      lang: sanitizedLang,
      data: sanitizedData,
    };

    // Cache the metadata in `#map` for future reference.
    this.#map.set(sanitizedId, vMarkdownFileMeta);

    return vMarkdownFileMeta;
  }

  /**
   * Asynchronously loads a Markdown file by its id, extracting its content and frontmatter metadata.
   */
  async loadVMarkdownFile(id: VMarkdownFile['id']): Promise<VMarkdownFile> {
    const { id: sanitizedId, slug: sanitizedSlug, lang: sanitizedLang } = assertId(id);
    const key = `../posts/docs/${sanitizedId}.md` as keyof typeof modules;

    if (!(key in modules)) {
      throw new Error(`Markdown file not found: \`${sanitizedId}\``);
    }

    const { data, content } = frontmatter(modules[key]);
    const sanitizedData = assertFrontmatter(data, sanitizedId);

    // Get a chance to cache the metadata in `#map` if it hasn't been cached already.
    if (!this.#map.has(sanitizedId)) {
      this.#map.set(sanitizedId, {
        id: sanitizedId,
        slug: sanitizedSlug,
        lang: sanitizedLang,
        data: sanitizedData,
      });
    }

    return {
      id: sanitizedId,
      slug: sanitizedSlug,
      lang: sanitizedLang,
      data: sanitizedData,
      content,
    };
  }

  // ------------------------------------------------------------------------------
  // Getter and Setter
  // ------------------------------------------------------------------------------

  /**
   * A record mapping each language key to slugs and their corresponding metadata.
   *
   * @example
   * ```ts
   * {
   *   ko: {
   *     'example-post': {
   *       id: 'example-post.ko',
   *       slug: 'example-post',
   *       lang: 'ko',
   *       data: {
   *         title: 'Example Post',
   *         description: 'This is an example post.',
   *         created: '2024-01-01',
   *         updated: '2024-01-02',
   *         categories: ['javascript', 'markdown'],
   *         references: ['https://example.com'],
   *       },
   *     },
   *   },
   *   en: {
   *     // ...English Markdown file metadata by slug
   *   },
   * }
   * ```
   */
  get byLangSlug(): MarkdownCollectionByLangSlug {
    return this.#ensureByLangSlug();
  }

  /**
   * A record mapping each language key to category keys and their corresponding Markdown file metadata arrays.
   *
   * @example
   * ```ts
   * {
   *   ko: {
   *     javascript: [
   *       {
   *         id: 'example-post.ko',
   *         slug: 'example-post',
   *         lang: 'ko',
   *         data: {
   *           title: 'Example Post',
   *           description: 'This is an example post.',
   *           created: '2024-01-01',
   *           updated: '2024-01-02',
   *           categories: ['javascript', 'markdown'],
   *           references: ['https://example.com'],
   *         },
   *       },
   *     ],
   *     markdown: [
   *       // ...Korean Markdown file metadata
   *     ],
   *   },
   *   en: {
   *     // ...English Markdown file metadata by category
   *   },
   * }
   * ```
   */
  get byLangCategory(): MarkdownCollectionByLangCategory {
    return this.#ensureByLangCategory();
  }

  /**
   * Returns a record of category keys that have at least one associated Markdown file for each language.
   *
   * @example
   * ```ts
   * import createMarkdownCollection from '@/utils/markdown-collection';
   *
   * const markdownCollection = createMarkdownCollection();
   * const nonEmptyCategories = markdownCollection.nonEmptyCategoryKeys;
   * console.log(nonEmptyCategories.ko); // Output: ['javascript', 'markdown']
   * ```
   */
  get nonEmptyCategoryKeys(): LangRecord<CategoryKey[]> {
    return Object.fromEntries(
      langKeys.map(lang => [
        lang,
        categoryKeys.filter(
          categoryKey => this.byLangCategory[lang][categoryKey].length > 0,
        ),
      ]),
    ) as LangRecord<CategoryKey[]>;
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A singleton instance of the `MarkdownCollection` class.
 */
let markdownCollection: MarkdownCollection | null = null;

/**
 * Creates and returns a singleton instance of the `MarkdownCollection` class
 * that represents a collection of Markdown files.
 *
 * @example
 * ```ts
 * import createMarkdownCollection from '@/utils/markdown-collection';
 *
 * const markdownCollection = createMarkdownCollection();
 * ```
 */
export default function createMarkdownCollection() {
  markdownCollection ??= new MarkdownCollection();

  return markdownCollection;
}
