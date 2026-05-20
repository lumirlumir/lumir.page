/**
 * @fileoverview CORS helper for API routes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from './constants.ts';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Create CORS headers for API routes.
 * @param origin The origin of the incoming request.
 * @param allowMethods The allowed HTTP methods for the API route.
 * @returns A Headers object containing the appropriate CORS headers.
 */
export function createCORSHeaders(origin: string, allowMethods: string): Headers {
  const headers = new Headers({
    'Access-Control-Allow-Methods': allowMethods,
    Allow: allowMethods,
    Vary: 'Origin',
  });

  if (!origin) {
    return headers;
  }

  if (ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number])) {
    headers.set('Access-Control-Allow-Origin', origin); // CORS
  }

  return headers;
}
