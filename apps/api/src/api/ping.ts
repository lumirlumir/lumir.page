/**
 * @fileoverview Ping endpoint for API routes.
 * @see https://vercel.com/docs/functions
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Allow
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ALLOW_METHODS = 'GET, HEAD, OPTIONS';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // CORS: We allow all origins because this endpoint is used for public health checks.
  'Access-Control-Allow-Methods': ALLOW_METHODS, // CORS
  Allow: ALLOW_METHODS,
  'Cache-Control': 'no-store',
} as const;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/api/ping` API route handler.
 */
export default {
  fetch({ method }: Request) {
    if (process.env.DISABLE_PING === 'true') {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
        headers: CORS_HEADERS,
      });
    }

    switch (method) {
      case 'GET': {
        return new Response('pong', {
          status: 200,
          statusText: 'OK',
          headers: CORS_HEADERS,
        });
      }

      case 'HEAD': {
        return new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: CORS_HEADERS,
        });
      }

      case 'OPTIONS': {
        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: CORS_HEADERS,
        });
      }

      default: {
        return new Response(`method ${method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: CORS_HEADERS,
        });
      }
    }
  },
} as const;
