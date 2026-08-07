/**
 * @fileoverview frontmatter.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import yaml from 'yaml';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Front matter regex pattern to match YAML front matter at the beginning of a string.
 * Line endings can be CRLF (`\r\n`), CR (`\r`), or LF (`\n`) as per CommonMark specification.
 * @see https://spec.commonmark.org/0.31.2/#line-ending
 */
const frontmatterRegex =
  /^---(?:\r\n|[\r\n])(?:(?<yaml>[\s\S]*?)(?:\r\n|[\r\n]))?---(?:\r\n|[\r\n]|$)/;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Parses the front matter from a string and returns the content without the front matter and the parsed data.
 * If no front matter is found, it returns the original content and `null` data.
 * @template Data The expected type of the parsed front matter data. Defaults to `unknown`.
 * @example
 *
 * ```ts
 * import { frontmatter } from '@lumir/utils';
 *
 * type Data = { title: string; author: string };
 *
 * const result = frontmatter<Data>(`---\ntitle: Title\nauthor: Author\n---\nHello, world!`);
 *
 * console.log(result);
 * // {
 * //   content: 'Hello, world!',
 * //   data: {
 * //     title: 'Title',
 * //     author: 'Author',
 * //   },
 * // }
 * ```
 */
export function frontmatter<Data = unknown>(
  input: string,
): {
  content: string;
  data: Data | null;
} {
  const match = input.match(frontmatterRegex);

  if (!match) {
    return {
      content: input,
      data: null,
    };
  }

  return {
    content: input.slice(match[0].length),
    data: yaml.parse(match.groups?.yaml ?? ''),
  };
}

/**
 * Parses the front matter from a string and returns only the parsed data.
 * If no front matter is found, it returns `null` data.
 * @template Data The expected type of the parsed front matter data. Defaults to `unknown`.
 * @example
 *
 * ```ts
 * import { frontmatterData } from '@lumir/utils';
 *
 * type Data = { title: string; author: string };
 *
 * const result = frontmatterData<Data>(`---\ntitle: Title\nauthor: Author\n---\nHello, world!`);
 *
 * console.log(result);
 * // {
 * //   data: {
 * //     title: 'Title',
 * //     author: 'Author',
 * //   },
 * // }
 * ```
 */
export function frontmatterData<Data = unknown>(
  input: string,
): {
  data: Data | null;
} {
  const match = input.match(frontmatterRegex);

  if (!match) {
    return {
      data: null,
    };
  }

  return {
    data: yaml.parse(match.groups?.yaml ?? ''),
  };
}
