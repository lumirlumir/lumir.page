/**
 * @fileoverview TODO
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { writeFileSync } from 'node:fs';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getMonthRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0));

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

// --------------------------------------------------------------------------------
// Script
// --------------------------------------------------------------------------------

const year = 2024;
const month = 1;

const { start, end } = getMonthRange(year, month);

const url = new URL('https://api.github.com/search/issues');
url.searchParams.set(
  'q',
  `created:${start}..${end} -org:lumirlumir author:lumirlumir is:merged`,
);
url.searchParams.set('per_page', '100');

const res = await fetch(url);
const data = await res.json();

if (data.total_count >= 100) {
  throw new Error('Too many results, please narrow down your search criteria.');
}

console.log(data.total_count, 'results found for', start, 'to', end);

writeFileSync(
  `data-${year}-${month}.json`,
  JSON.stringify(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Intentionally using any type for the items in the data object
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
