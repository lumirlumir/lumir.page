/**
 * @fileoverview Local development client for testing the API server.
 * Usage: `node path/to/client.ts <method> <pathname> [--error]`
 */

/* eslint-disable no-console -- This file is for local development testing */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseArgs } from 'node:util';
import { DEV_SERVER_URL } from './constants.ts';

// --------------------------------------------------------------------------------
// Execution: Parse Args
// --------------------------------------------------------------------------------

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    error: {
      type: 'boolean',
      short: 'e',
      default: false,
    },
    verbose: {
      type: 'boolean',
      short: 'v',
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
  allowNegative: false,
  tokens: false,
});

const [method, pathname, body] = positionals;
const { error, verbose } = values;

if (!method) {
  console.error('Error: HTTP method is required as the first positional argument.');
  process.exit(1);
}

if (!pathname) {
  console.error('Error: Pathname is required as the second positional argument.');
  process.exit(1);
}

// --------------------------------------------------------------------------------
// Execution: Make Request
// --------------------------------------------------------------------------------

const response = await fetch(
  `${DEV_SERVER_URL}/api/${pathname}${error ? '?error=true' : ''}`,
  {
    method: method.toUpperCase(),
    body,
  },
);

if (verbose) {
  console.log('-'.repeat(process.stdout.columns));
  console.log(response);
}

response.text().then(data => {
  console.log('-'.repeat(process.stdout.columns));
  console.log(data);
});
