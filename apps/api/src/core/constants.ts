/**
 * @fileoverview Defines shared constants for the api routes.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const DEV_SERVER_PORT = 3242;

export const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

export const DEV_FRONTEND_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
] as const;

export const ALLOW_ORIGINS = [
  'https://lumir.page',
  'https://moing.lumir.page',
  ...(process.env.NODE_ENV === 'dev' ? DEV_FRONTEND_ORIGINS : []),
] as const;
