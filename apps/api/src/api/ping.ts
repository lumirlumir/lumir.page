/**
 * @fileoverview Ping endpoint for API routes.
 * @see https://vercel.com/docs/functions
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from '../core/constants.ts';
import { createCORSHeaders } from '../core/utils.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ALLOWED_METHODS = 'GET, HEAD, OPTIONS';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/api/ping` API route handler.
 */
export default {
  fetch({ method, headers }: Request) {
    if (process.env.DISABLE_CHAT === 'true') {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
      });
    }

    const origin = headers.get('Origin');

    if (origin === null || !ALLOWED_ORIGINS.has(origin)) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    const corsHeaders = createCORSHeaders(origin, ALLOWED_METHODS);

    switch (method) {
      case 'GET': {
        return new Response('pong', {
          status: 200,
          statusText: 'OK',
          headers: corsHeaders,
        });
      }

      case 'HEAD': {
        return new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: corsHeaders,
        });
      }

      case 'OPTIONS': {
        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: corsHeaders,
        });
      }

      default: {
        return new Response(`method ${method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: corsHeaders,
        });
      }
    }
  },
} as const;
