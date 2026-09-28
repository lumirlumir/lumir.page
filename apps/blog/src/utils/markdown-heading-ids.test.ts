/**
 * @fileoverview Tests that translated post headings share stable anchors.
 */

import { remarkCustomHeadingId } from '@lumir/remark-plugins';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { assert, describe, it } from 'vitest';
import markdownModules from './markdown-modules.js';

describe('translated post heading IDs', () => {
  it('should give corresponding Korean and English headings the same English IDs', async () => {
    const posts: Record<string, string> = markdownModules;
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkCustomHeadingId)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeStringify);

    await Promise.all(
      Object.entries(posts)
        .filter(([id]) => id.endsWith('.en'))
        .map(async ([englishId, englishPost]) => {
          const koreanId = englishId.replace(/\.en$/, '.ko');
          const koreanPost = posts[koreanId];
          assert.isDefined(koreanPost, `${englishId} needs a Korean translation`);

          const [englishHeadingIds, koreanHeadingIds] = await Promise.all(
            [englishPost, koreanPost].map(async post => {
              const html = String(await processor.process(post));
              return [...html.matchAll(/<h[1-6][^>]*\bid="(?<id>[^"]+)"/g)].map(
                match => match.groups?.id ?? '',
              );
            }),
          );

          assert.deepEqual(englishHeadingIds, koreanHeadingIds, englishId);
          assert.equal(
            new Set(englishHeadingIds).size,
            englishHeadingIds.length,
            englishId,
          );
          for (const headingId of englishHeadingIds) {
            assert.match(headingId, /^[a-z0-9-]+$/, englishId);
          }
        }),
    );
  }, 120_000);
});
