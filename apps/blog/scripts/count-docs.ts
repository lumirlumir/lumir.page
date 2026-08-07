import { globSync } from 'node:fs';

console.log(
  'Number of docs:',
  globSync('**/*.md', { cwd: new URL('../src/posts/docs', import.meta.url) }).length,
);
