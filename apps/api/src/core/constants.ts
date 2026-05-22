/**
 * @fileoverview Defines shared constants for the api routes.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const DEV_SERVER_PORT = 3242;

export const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

export const ALLOW_ORIGINS = new Set<string>([
  'https://lumir.page',
  'https://www.lumir.page',
  'https://blog.lumir.page',
  'https://www.blog.lumir.page',
  'https://moing.lumir.page',
  'https://www.moing.lumir.page',
]);
