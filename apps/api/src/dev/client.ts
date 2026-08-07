/**
 * @fileoverview Local development client for testing the API server.
 * Usage: `node path/to/client.ts <method> <pathname> [body] [--error | -e] [--verbose | -v]`
 * Example: `npm run req -- POST chat '{"messages":[{"role":"user","content":"Hi, how are you?"}]}' -v`
 */

/* eslint-disable no-console -- This file is for local development testing */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseArgs } from 'node:util';
import { ALLOW_ORIGINS, DEV_SERVER_URL } from '../core/constants.ts';

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
  `${DEV_SERVER_URL}/api/${pathname}${error ? '?error' : ''}`,
  {
    headers: {
      Origin: ALLOW_ORIGINS[0],
      'User-Agent': 'User-Agent for local development testing',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
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
