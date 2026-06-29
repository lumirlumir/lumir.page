/**
 * @fileoverview Script to generate GitHub contributions data for a specific month and year.
 * @see https://docs.github.com/en/rest/search/search?apiVersion=2026-03-10#search-issues-and-pull-requests
 * Usage: `node path/to/generate-github-contributions.ts <type> <year> <month>`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { writeFileSync } from 'node:fs';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const urlGitHubSearchIssues = new URL('https://api.github.com/search/issues');

/**
 * Gets the start and end dates of a specific month in a given year.
 * @param year The year for which to get the month range.
 * @param month The month (`'01'`-`'12'`) for which to get the range.
 * @returns A tuple containing the start and end dates of the month in ISO format (`YYYY-MM-DD`).
 */
function getMonthRange(
  year: string,
  month:
    '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12',
): readonly [start: string, end: string] {
  const start = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  const end = new Date(Date.UTC(Number(year), Number(month), 0));

  return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)] as const;
}

// --------------------------------------------------------------------------------
// Script
// --------------------------------------------------------------------------------

const [type, year, month] = process.argv.slice(2);

if (type !== 'issue' && type !== 'merged') {
  throw new Error('Invalid type. Please provide either `issue` or `merged`.');
}

if (
  month !== '01' &&
  month !== '02' &&
  month !== '03' &&
  month !== '04' &&
  month !== '05' &&
  month !== '06' &&
  month !== '07' &&
  month !== '08' &&
  month !== '09' &&
  month !== '10' &&
  month !== '11' &&
  month !== '12'
) {
  throw new Error('Invalid month. Please provide a month between `01` and `12`.');
}

const [start, end] = getMonthRange(year, month);

urlGitHubSearchIssues.searchParams.set(
  'q',
  `created:${start}..${end} author:lumirlumir -org:lumirlumir is:${type}`,
);
urlGitHubSearchIssues.searchParams.set('per_page', '100');

const res = await fetch(urlGitHubSearchIssues);
const data = await res.json();

if (data.total_count >= 100) {
  throw new Error('Too many results, please narrow down your search criteria.');
}

console.log(data.total_count, 'results found for', start, 'to', end);

writeFileSync(
  new URL(`../src/generated/${type}-${year}-${month}.json`, import.meta.url),
  `${JSON.stringify(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Intentional
    data.items.map((item: any) => ({
      repositoryUrl: item.repository_url,
      htmlUrl: item.html_url,
      id: item.id,
      nodeId: item.node_id,
      number: item.number,
      title: item.title,
      createdAt: item.created_at,
      closedAt: item.closed_at,
      reactions: {
        '+1': item.reactions['+1'],
      },
    })),
    null,
    2,
  )}\n`,
);
