/**
 * @fileoverview Script to generate GitHub contributions data for a specific month and year.
 * @see https://docs.github.com/en/rest/search/search?apiVersion=2026-03-10#search-issues-and-pull-requests
 * Usage: `node generate-github-contributions.ts <type> <year> <month>`
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
 * @param month The month (`1`-`12`) for which to get the range.
 * @returns A tuple containing the start and end dates of the month in ISO format (`YYYY-MM-DD`).
 */
function getMonthRange(
  year: number,
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
): readonly [start: string, end: string] {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0));

  return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)] as const;
}

// --------------------------------------------------------------------------------
// Script
// --------------------------------------------------------------------------------

const [type] = process.argv.slice(2);
const [year, month] = process.argv.slice(3).map(Number);

if (type !== 'issue' && type !== 'merged') {
  throw new Error('Invalid type. Please provide either `issue` or `merged`.');
}

if (
  month !== 1 &&
  month !== 2 &&
  month !== 3 &&
  month !== 4 &&
  month !== 5 &&
  month !== 6 &&
  month !== 7 &&
  month !== 8 &&
  month !== 9 &&
  month !== 10 &&
  month !== 11 &&
  month !== 12
) {
  throw new Error('Invalid month. Please provide a month between `1` and `12`.');
}

const [start, end] = getMonthRange(year, month);

urlGitHubSearchIssues.searchParams.set(
  'q',
  `created:${start}..${end} -org:lumirlumir author:lumirlumir is:${type}`,
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
  JSON.stringify(
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
  ),
);
