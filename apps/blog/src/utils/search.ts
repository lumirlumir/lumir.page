/**
 * @fileoverview Builds blog search documents and creates their MiniSearch index.
 */

import MiniSearch from 'minisearch';
import { type VMarkdownFileMeta, type VMarkdownHeading } from '@/data/v-markdown';

/**
 * A post introduction or heading section with its destination and searchable text.
 */
export interface SearchDocument
  extends Omit<VMarkdownFileMeta, 'id'>, Pick<VMarkdownHeading, 'heading' | 'content'> {
  readonly id: string;
  readonly url: `/${VMarkdownFileMeta['lang']}/posts/${string}`;
  /** Ancestor heading names in document order, excluding the article title. */
  readonly headingPath: readonly string[];
}

/**
 * Creates a post record and heading records from metadata and extracted headings.
 * The generated title H1 contributes its introduction to the post record.
 */
export function createSearchDocuments(
  metadata: VMarkdownFileMeta,
  headings: readonly VMarkdownHeading[],
): SearchDocument[] {
  const url: SearchDocument['url'] = `/${metadata.lang}/posts/${metadata.slug}`;

  const titleHeading = headings[0];
  const hasTitle = titleHeading?.level === 1 && titleHeading.id === metadata.slug;
  const bodyHeadings = hasTitle ? headings.slice(1) : headings;

  return [
    {
      ...metadata,
      id: `${metadata.id}:0`,
      url,
      heading: '',
      headingPath: [],
      content: hasTitle ? titleHeading.content : '',
    },
    ...bodyHeadings.map((section, index): SearchDocument => {
      const headingPath: string[] = [];
      let { parent } = section;

      while (parent) {
        if (!(hasTitle && parent.id === titleHeading.id && parent.level === 1)) {
          headingPath.unshift(parent.heading);
        }

        parent = parent.parent;
      }

      return {
        ...metadata,
        id: `${metadata.id}:${index + 1}`,
        url: section.id ? `${url}#${encodeURIComponent(section.id)}` : url,
        heading: section.heading,
        headingPath,
        content: section.content,
      };
    }),
  ];
}

/**
 * Creates and populates a MiniSearch instance, preserving its native search API.
 */
export function createLocalSearch(
  documents: SearchDocument[],
): MiniSearch<SearchDocument> {
  const search = new MiniSearch<SearchDocument>({
    fields: ['title', 'description', 'heading', 'content'],
    extractField: (document, fieldName) => {
      if (fieldName === 'title' || fieldName === 'description') {
        // Keep post metadata searches on the post record instead of every section.
        return document.heading ? '' : document.data[fieldName];
      }

      return document[fieldName as keyof SearchDocument];
    },
    searchOptions: {
      boost: { title: 2, description: 1, heading: 2, content: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
    storeFields: [
      'id',
      'slug',
      'lang',
      'readtime',
      'data',
      'url',
      'heading',
      'headingPath',
      'content',
    ] satisfies (keyof SearchDocument)[],
  });

  search.addAll(documents);

  return search;
}
