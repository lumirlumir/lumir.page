/**
 * @fileoverview Ping endpoint for API routes.
 * @see https://vercel.com/docs/functions
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from '../src/constants.ts';
import { createCORSHeaders } from '../src/utils.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const allowMethods = 'GET, HEAD, OPTIONS';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/api/ping` API route handler.
 */
export default {
  fetch(request: Request) {
    if (process.env.DISABLE_CHAT === 'true') {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
      });
    }

    const origin = request.headers.get('Origin');

    if (origin === null || !ALLOWED_ORIGINS.has(origin)) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    switch (request.method) {
      case 'GET': {
        return new Response('pong', {
          status: 200,
          statusText: 'OK',
          headers: createCORSHeaders(origin, allowMethods),
        });
      }

      case 'HEAD': {
        return new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: createCORSHeaders(origin, allowMethods),
        });
      }

      case 'OPTIONS': {
        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: createCORSHeaders(origin, allowMethods),
        });
      }

      default: {
        return new Response(`method ${request.method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: createCORSHeaders(origin, allowMethods),
        });
      }
    }
  },
} as const;
