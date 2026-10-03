/**
 * @fileoverview Builds blog search documents and creates their MiniSearch index.
 */

import MiniSearch from 'minisearch';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';

/**
 * A post introduction or heading section with its destination and searchable text.
 */
export interface SearchDocument extends Omit<VMarkdownFileMeta, 'id'> {
  readonly id: string;
  readonly url: `/${VMarkdownFileMeta['lang']}/posts/${string}`;
  readonly heading: string;
  readonly content: string;
}

/**
 * Creates post and section records from metadata and sections extracted on the server.
 */
export function createSearchDocuments(
  metadata: VMarkdownFileMeta,
  sections: readonly { heading: string; anchor: string; content: string }[],
): SearchDocument[] {
  const url: SearchDocument['url'] = `/${metadata.lang}/posts/${metadata.slug}`;

  return sections.map((section, index): SearchDocument => ({
    ...metadata,
    id: `${metadata.id}:${index}`,
    url: section.anchor ? `${url}#${encodeURIComponent(section.anchor)}` : url,
    heading: section.heading,
    content: section.content,
  }));
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
      'content',
    ] satisfies (keyof SearchDocument)[],
  });

  search.addAll(documents);

  return search;
}
