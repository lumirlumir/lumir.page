/**
 * @fileoverview Ping endpoint for API routes.
 * @see https://vercel.com/docs/functions
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from '../src/constants.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function createCORSHeaders(request: Request): Headers {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    Allow: 'GET, HEAD, OPTIONS',
    Vary: 'Origin', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary
  });

  const origin = request.headers.get('Origin');

  if (!origin) {
    return headers;
  }

  if (ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number])) {
    headers.set('Access-Control-Allow-Origin', origin); // CORS
  }

  return headers;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/api/ping` API route handler.
 */
export default {
  fetch(request: Request) {
    switch (request.method) {
      case 'GET': {
        return new Response('pong', {
          status: 200,
          statusText: 'OK',
          headers: createCORSHeaders(request),
        });
      }

      case 'HEAD': {
        return new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: createCORSHeaders(request),
        });
      }

      case 'OPTIONS': {
        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: createCORSHeaders(request),
        });
      }

      default: {
        return new Response(`method ${request.method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: createCORSHeaders(request),
        });
      }
    }
  },
} as const;
